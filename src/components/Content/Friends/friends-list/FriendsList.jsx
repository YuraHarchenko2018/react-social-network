import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getFriendsSelector } from '../../../../redux/selectors/users'
import generateStatus from '../../../../utils/helpers/generateStatus'
import { serverLink } from '../../../../constants/common'
import NoFriendsPreview from './NoFriendsPreview/NoFriendsPreview'
import s from './FriendsList.module.css'

const mapFriendsFunc = (user) => <FriendItem key={user.id} user={user} />

function FriendsList() {
  const friends = useSelector(getFriendsSelector)

  return (
    <div className={s.usersList}>
      {
        friends.length ? friends.map(mapFriendsFunc) : <NoFriendsPreview />
      }
    </div>
  )
}

function FriendItem({ user }) {
  const avatarImg = serverLink + user.avatarImg

  return (
    <div key={user.id} className={s.userItem}>
      <div>
        <Avatar userId={user.id} avatarImg={avatarImg} />
      </div>
      <div className={s.userItemElementDiv}>
        <UserNameTitle userId={user.id} username={user.name} />
        <UserStatus userStatus={user.status} />
      </div>
    </div>
  )
}

function Avatar({ userId, avatarImg }) {
  return (
    <div className={`${s.userItemElementDiv} ${s.userItemAvatarDivWrapper}`}>
      <NavLink className={s.userNameLink} to={`/profile/${userId}`}>
        <img className={s.userItemAvatarImg} alt="#" src={avatarImg} />
      </NavLink>
    </div>
  )
}

function UserNameTitle({ userId, username }) {
  return (
    <NavLink className={s.userNameLink} to={`/profile/${userId}`}>
      <div className={s.userNameDivWrapper}>
        {username}
      </div>
    </NavLink>
  )
}

function UserStatus({ userStatus }) {
  return (
    <div className={s.userStatusWrapper}>
      {userStatus || generateStatus()}
    </div>
  )
}

export default FriendsList
