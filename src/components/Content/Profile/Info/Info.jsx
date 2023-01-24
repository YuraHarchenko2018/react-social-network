import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoSelector } from '../../../../redux/selectors/profile'
import { getAuthUserIdSelector } from '../../../../redux/selectors/auth'
import Status from './Status/Status'
import OptionsWindow from '../../../common/OptionsWindow/OptionsWindow'
import DefaultLocalProfileBg from '../../../../assets/profile-background.png'
import { setContent, setIsShow, setPayload } from '../../../../redux/reducers/popup'
import { defaultProfileBg, serverLink } from '../../../../constants/common'
import s from './Info.module.css'

function Info() {
  const dispatch = useDispatch()

  const userInfo = useSelector(getUserInfoSelector)
  const authUserId = useSelector(getAuthUserIdSelector)

  const profileBg = navigator.onLine ? defaultProfileBg : DefaultLocalProfileBg
  const profileAvatar = serverLink + userInfo.avatarImg

  const handleUpdateInfoBtn = () => {
    dispatch(setContent({ content: 'updateUserInfo' }))
    dispatch(setPayload(userInfo))
    dispatch(setIsShow({ isShow: true }))
  }

  const buttonsSettings = [
    {
      id: 1,
      text: 'Edit profile info',
      onClickFunc: handleUpdateInfoBtn,
    },
  ]

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
        <EditProfileButton
          userId={userInfo.id}
          authUserId={authUserId}
          buttonsSettings={buttonsSettings}
        />
      </div>
    </div>
  )
}

export default Info

function ProfileBackground(props) {
  return (
    <div className={s.userInfoBackgroundWrapper}>
      <img alt="#" {...props} />
    </div>
  )
}

function ProfileAvatar(props) {
  return (
    <div className={s.userInfoAvatarWrapper}>
      <img alt="#" {...props} />
    </div>
  )
}

function UsernameBlock({ name }) {
  return (
    <div className={s.userInfoName}>
      <span>{name}</span>
    </div>
  )
}

function AdditionalData({ email, age }) {
  return (
    <div className={s.userInfoData}>
      <ul>
        <li>
          Email:
          {email}
        </li>
        <li>
          Age:
          {age}
        </li>
      </ul>
    </div>
  )
}

function EditProfileButton({ userId, authUserId, buttonsSettings }) {
  return (
    <div className={s.userInfoDataWrapper}>
      {
        userId === authUserId && <OptionsWindow buttonsSettings={buttonsSettings} />
      }
    </div>
  )
}
