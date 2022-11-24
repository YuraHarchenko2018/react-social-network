import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { generateStatus } from "utils/helpers/generateStatus"
import { updateUserStatus } from "redux/reducers/profile"
import { getUserInfoSelector } from "redux/selectors/profile"
import { getAuthUserIdSelector } from "redux/selectors/auth"

import PlayBackSpeed from "./PlaybackSpeed"
import OptionsWindow from "components/common/OptionsWindow/OptionsWindow"
import DefaultAvatarImg from "../../../../assets/default-avatar.webp"
import DefaultLocalProfileBg from "../../../../assets/profile-background.png"

import s from "./Info.module.css"


const Info = () => {
    const dispatch = useDispatch()

    const userInfo = useSelector(state => getUserInfoSelector(state))
    const authUserId = useSelector(state => getAuthUserIdSelector(state))

    const defaultProfileBg = 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000'

    const userStatus = userInfo.status || generateStatus()

    const [localUserStatus, setLocalUserStatus] = useState(userStatus)
    const [isStatusEditMode, setStatusEditMode] = useState(false)
    const [profileBg, setProfileBg] = useState(null)
    const [profileAva, setProfileAva] = useState(null)

    useEffect(() => {
        fetch(defaultProfileBg).then(() => setProfileBg(defaultProfileBg)).catch(() => setProfileBg(null))
    }, [setProfileBg])

    useEffect(() => {
        fetch(userInfo.avatarImg).then(() => setProfileAva(userInfo.avatarImg)).catch(() => setProfileAva(null))
    }, [userInfo.avatarImg, setProfileAva])

    const userStatusInputOnChange = ({ target }) => setLocalUserStatus(target.value)

    const toggleUserStatusMode = () => {
        if (userInfo.id === authUserId) {
            setStatusEditMode(!isStatusEditMode)
        }
    }

    const handleUserStatus = () => {
        toggleUserStatusMode()

        if (!localUserStatus) {
            setLocalUserStatus(userStatus)
        }

        if (localUserStatus !== userInfo.status) {
            // @ts-ignore
            dispatch(updateUserStatus(localUserStatus))
        }
    }

    const renderStatusBar = () => {
        return (isStatusEditMode)
            ? (
                <input
                    className={s.statusInput}
                    autoFocus
                    onBlur={handleUserStatus}
                    onChange={userStatusInputOnChange}
                    value={localUserStatus}
                />
            )
            : (
                <span
                    onClick={toggleUserStatusMode}
                    className={s.statusSpan}>
                    {localUserStatus}
                </span>
            )
    }

    const buttonsSettings = [
        {
            id: 1,
            text: "Edit profile info",
            onClickFunc: () => console.log('tetetetete')
        }
    ]

    return (
        <div className={s.userInfo}>
            <div className={s.userInfoBackgroundWrapper}>
                <img alt="#" src={profileBg ?? DefaultLocalProfileBg} />
            </div>
            <div className={s.userInfoBlock}>
                <div className={s.userInfoAvatarWrapper}>
                    <img alt="" src={profileAva ?? DefaultAvatarImg} />
                </div>
                <div className={s.userInfoDataWrapper}>
                    <div className={s.userInfoName}>
                        <span>{userInfo.name}</span>
                    </div>
                    <div className={s.userInfoStatusWrapper}>
                        {renderStatusBar()}
                    </div>
                    <div className={s.userInfoData}>
                        <ul>
                            <li>Email: {userInfo.email}</li>
                            <li>Age: {userInfo.age}</li>
                            <li><PlayBackSpeed minutes={7} seconds={0} speed={1.5} /></li>
                        </ul>
                    </div>
                </div>
                <div className={s.userInfoDataWrapper}>
                    {userInfo.id === authUserId && <OptionsWindow buttonsSettings={buttonsSettings} />}
                </div>
            </div>
        </div>
    )
}

export default Info