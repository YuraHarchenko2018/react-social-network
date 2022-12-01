import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFriendsSelector } from "redux/selectors/users";
import { generateStatus } from "utils/helpers/generateStatus";
import DefaultAvatarImg from "../../../../assets/default-avatar.webp"

import s from './FriendsList.module.css'


const FriendsList = () => {
    const friends = useSelector(state => getFriendsSelector(state))

    return (
        <div className={s.usersList}>
            {
                friends.map(user => {
                    return <FriendItem key={user.id} user={user} />
                })
            }
        </div>
    )
}

const FriendItem = ({ user }) => {
    const [avatarImg, setAvatarImg] = useState(user.avatarImg)

    useEffect(() => {
        fetch(user.avatarImg).catch(() => setAvatarImg(null))
    }, [setAvatarImg, user.avatarImg])

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

const Avatar = ({ userId, avatarImg }) => {
    const profileAvatar = navigator.onLine ? avatarImg : DefaultAvatarImg
    return (
        <div className={s.userItemElementDiv + " " + s.userItemAvatarDivWrapper}>
            <NavLink className={s.userNameLink} to={`/profile/${userId}`}>
                <img className={s.userItemAvatarImg} alt="#" src={profileAvatar} />
            </NavLink>
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


export default FriendsList
