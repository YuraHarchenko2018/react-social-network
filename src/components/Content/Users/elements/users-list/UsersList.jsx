import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { follow, unfollow } from '../../../../../redux/reducers/users'
import { getAuthUserIdSelector } from '../../../../../redux/selectors/auth'
import { getFollowingInProcessSelector, getUsersSelector } from '../../../../../redux/selectors/users'
import generateStatus from '../../../../../utils/helpers/generateStatus'
import { serverLink } from '../../../../../constants/common'
import s from './UsersList.module.css'

function UsersList() {
  const users = useSelector(getUsersSelector)

  return (
    <div className={s.usersList}>
      {
        users && users.map((user) => <UserItem key={user.id} user={user} />)
      }
    </div>
  )
}

function UserItem({ user }) {
  const avatarImg = serverLink + user.avatarImg

  return (
    <div key={user.id} className={s.userItem}>
      <div>
        <Avatar userId={user.id} avatarImg={avatarImg} />
        <FollowButton userId={user.id} isFollow={user.isFollow} />
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

function FollowButton({ userId, isFollow }) {
  const dispatch = useDispatch()

  const authUserId = useSelector(getAuthUserIdSelector)
  const followingInProcess = useSelector(getFollowingInProcessSelector)

  const handleFollow = () => dispatch(follow(userId))
  const handleUnfollow = () => dispatch(unfollow(userId))

  const isDisabled = followingInProcess.some((fid) => fid === userId)
  const isFollowAvailable = userId !== authUserId

  return (
    <div className={s.userItemElementDiv}>
      {
        isFollowAvailable && isFollow && (
          <button
            type="button"
            className={s.userFollowButton}
            disabled={isDisabled}
            onClick={handleUnfollow}
          >
            Unfollow
          </button>
        )
      }
      {
        isFollowAvailable && !isFollow && (
          <button
            type="button"
            className={s.userFollowButton}
            disabled={isDisabled}
            onClick={handleFollow}
          >
            Follow
          </button>
        )
      }
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

export default UsersList
