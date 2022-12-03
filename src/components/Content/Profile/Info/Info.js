import React from "react"
import { getUserInfoSelector } from "redux/selectors/profile"
import { getAuthUserIdSelector } from "redux/selectors/auth"
import Status from "./Status/Status"
import PlayBackSpeed from "./PlaybackSpeed"
import OptionsWindow from "components/common/OptionsWindow/OptionsWindow"
import DefaultAvatarImg from "../../../../assets/default-avatar.webp"
import DefaultLocalProfileBg from "../../../../assets/profile-background.png"
import { buttonsSettings, defaultProfileBg } from "constants/profile"
import s from "./Info.module.css"
// @ts-ignore
import { useAppSelector } from "./../../../../hooks/redux.ts"


const Info = () => {
    const userInfo = useAppSelector(getUserInfoSelector)
    const authUserId = useAppSelector(getAuthUserIdSelector)

    const profileBg = navigator.onLine ? defaultProfileBg : DefaultLocalProfileBg
    const profileAvatar = navigator.onLine ? userInfo.avatarImg : DefaultAvatarImg

    return (
        <div className={s.userInfo}>
            <ProfileBackground src={profileBg} />
            <div className={s.userInfoBlock}>
                <ProfileAvatar src={profileAvatar} />
                <div className={s.userInfoDataWrapper}>
                    <UsernameBlock name={userInfo.name} />
                    <Status userId={userInfo.id} actualUserStatus={userInfo.status} authUserId={authUserId} />
                    <AdditionalData email={userInfo.email} age={userInfo.age} />
                </div>
                <EditProfileButton userId={userInfo.id} authUserId={authUserId} />
            </div>
        </div>
    )
}

export default Info


const ProfileBackground = (props) => {
    return (
        <div className={s.userInfoBackgroundWrapper}>
            <img alt="#" {...props} />
        </div>
    )
}

const ProfileAvatar = (props) => {
    return (
        <div className={s.userInfoAvatarWrapper}>
            <img alt="#" {...props} />
        </div>
    )
}

const UsernameBlock = ({ name }) => {
    return (
        <div className={s.userInfoName}>
            <span>{name}</span>
        </div>
    )
}

const AdditionalData = ({ email, age }) => {
    return (
        <div className={s.userInfoData}>
            <ul>
                <li>Email: {email}</li>
                <li>Age: {age}</li>
                <li><PlayBackSpeed minutes={7} seconds={0} speed={1.5} /></li>
            </ul>
        </div>
    )
}

const EditProfileButton = ({ userId, authUserId }) => {
    return (
        <div className={s.userInfoDataWrapper}>
            {
                userId === authUserId && <OptionsWindow buttonsSettings={buttonsSettings} />
            }
        </div>
    )
}
