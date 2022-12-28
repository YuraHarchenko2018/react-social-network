import React from "react";
import { NavLink } from "react-router-dom";
import { follow, unfollow } from "redux/reducers/users";
import { getAuthUserIdSelector } from "redux/selectors/auth";
import { getFollowingInProcessSelector, getUsersSelector } from "redux/selectors/users";
import { generateStatus } from "utils/helpers/generateStatus";
import { serverLink } from "constants/common";
import s from './UsersList.module.css'
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../../../hooks/redux.ts"


const UsersList = () => {
    const users = useAppSelector(getUsersSelector)

    return (
        <div className={s.usersList}>
            {
                users && users.map(user => {
                    return <UserItem key={user.id} user={user} />
                })
            }
        </div>
    )
}

const UserItem = ({ user }) => {
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

const Avatar = ({ userId, avatarImg }) => {
    return (
        <div className={s.userItemElementDiv + " " + s.userItemAvatarDivWrapper}>
            <NavLink className={s.userNameLink} to={`/profile/${userId}`}>
                <img className={s.userItemAvatarImg} alt="#" src={avatarImg} />
            </NavLink>
        </div>
    )
}

const FollowButton = ({ userId, isFollow }) => {
    const dispatch = useAppDispatch()

    const authUserId = useAppSelector(getAuthUserIdSelector)
    const followingInProcess = useAppSelector(getFollowingInProcessSelector)

    const handleFollow = () => dispatch(follow(userId))
    const handleUnfollow = () => dispatch(unfollow(userId))

    return (
        <div className={s.userItemElementDiv}>
            {
                userId !== authUserId ?
                    isFollow ? (
                        <button
                            className={s.userFollowButton}
                            disabled={followingInProcess.some(fid => fid === userId)}
                            onClick={handleUnfollow}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            className={s.userFollowButton}
                            disabled={followingInProcess.some(fid => fid === userId)}
                            onClick={handleFollow}
                        >
                            Follow
                        </button>
                    )
                    : <></>
            }
        </div>
    )
}

const UserNameTitle = ({ userId, username }) => {
    return (
        <NavLink className={s.userNameLink} to={`/profile/${userId}`}>
            <div className={s.userNameDivWrapper}>
                {username}
            </div>
        </NavLink>
    )
}

const UserStatus = ({ userStatus }) => {
    return (
        <div className={s.userStatusWrapper}>
            {userStatus ? userStatus : generateStatus()}
        </div>
    )
}

export default UsersList
