import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { follow, unfollow } from "redux/reducers/users";
import { getAuthUserIdSelector } from "redux/selectors/auth";
import { getFollowingInProcessSelector, getUsersSelector } from "redux/selectors/users";
import { generateStatus } from "utils/helpers/generateStatus";
import DefaultAvatarImg from "../../../../../assets/default-avatar.webp"

import s from './UsersList.module.css'


const UsersList = () => {
    const users = useSelector(state => getUsersSelector(state))

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
    const [avatarImg, setAvatarImg] = useState(user.avatarImg)

    useEffect(() => {
        fetch(user.avatarImg).catch(() => setAvatarImg(null))
    }, [setAvatarImg, user.avatarImg])

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
                <img className={s.userItemAvatarImg} alt="#" src={avatarImg ?? DefaultAvatarImg} />
            </NavLink>
        </div>
    )
}

const FollowButton = ({ userId, isFollow }) => {
    const dispatch = useDispatch()
    const authUserId = useSelector(state => getAuthUserIdSelector(state))
    const followingInProcess = useSelector(state => getFollowingInProcessSelector(state))

    return (
        <div className={s.userItemElementDiv}>
            {
                userId !== authUserId ?
                    isFollow ? (
                        <button
                            className={s.userFollowButton}
                            disabled={followingInProcess.some(fid => fid === userId)}
                            // @ts-ignore
                            onClick={() => dispatch(unfollow(userId))}
                        >Unfollow</button>
                    ) : (
                        <button
                            className={s.userFollowButton}
                            disabled={followingInProcess.some(fid => fid === userId)}
                            // @ts-ignore
                            onClick={() => dispatch(follow(userId))}
                        >Follow</button>
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
