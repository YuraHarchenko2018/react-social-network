import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFriendsSelector } from "redux/selectors/users";
import { generateStatus } from "utils/helpers/generateStatus";
import { serverLink } from "constants/common";
import s from './FriendsList.module.css'


const FriendsList = () => {
    const friends = useSelector(getFriendsSelector)

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

const Avatar = ({ userId, avatarImg }) => {
    return (
        <div className={s.userItemElementDiv + " " + s.userItemAvatarDivWrapper}>
            <NavLink className={s.userNameLink} to={`/profile/${userId}`}>
                <img className={s.userItemAvatarImg} alt="#" src={avatarImg} />
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
