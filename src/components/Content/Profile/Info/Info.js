import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { generateStatus } from "utils/helpers/generateStatus"
import { updateUserStatus } from "redux/reducers/profile"
import { getUserInfoSelector } from "redux/selectors/profile"
import { getAuthUserIdSelector } from "redux/selectors/auth"

import PlayBackSpeed from "./PlaybackSpeed"
import OptionsWindow from "components/common/OptionsWindow/OptionsWindow"
// import DefaultProfileBg from "../../../../assets/profile-background.JPG"

import s from "./Info.module.css"


const Info = () => {
    const dispatch = useDispatch()

    const userInfo = useSelector(state => getUserInfoSelector(state))
    const authUserId = useSelector(state => getAuthUserIdSelector(state))

    const userStatus = userInfo.status || generateStatus()

    const [localUserStatus, setLocalUserStatus] = useState(userStatus)
    const [isStatusEditMode, setStatusEditMode] = useState(false)

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

    const defaultAvatarImg = 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'
    const defaultProfileBg = 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000'

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
                <img alt="#" src={defaultProfileBg} />
            </div>
            <div className={s.userInfoBlock}>
                <div className={s.userInfoAvatarWrapper}>
                    <img alt="" src={userInfo.avatarImg || defaultAvatarImg} />
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