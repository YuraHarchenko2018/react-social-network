import React, { useState } from "react"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../../hooks/redux.ts"
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
    const dispatch = useAppDispatch()

    const userInfo = useAppSelector(state => getUserInfoSelector(state))
    const authUserId = useAppSelector(state => getAuthUserIdSelector(state))

    const defaultProfileBg = 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000'

    const userStatus = userInfo.status || generateStatus()

    const [localUserStatus, setLocalUserStatus] = useState(userStatus)
    const [isStatusEditMode, setStatusEditMode] = useState(false)

    const profileBg = navigator.onLine ? defaultProfileBg : DefaultLocalProfileBg
    const profileAva = navigator.onLine ? userInfo.avatarImg : DefaultAvatarImg

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
                <img alt="#" src={profileBg} />
            </div>
            <div className={s.userInfoBlock}>
                <div className={s.userInfoAvatarWrapper}>
                    <img alt="" src={profileAva} />
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