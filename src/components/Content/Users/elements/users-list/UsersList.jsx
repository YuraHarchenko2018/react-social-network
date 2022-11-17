import React from "react";
import { NavLink } from "react-router-dom";
import { generateStatus } from "utils/helpers/generateStatus";

import s from './UsersList.module.css'


const UsersList = (props) => {
    const renderFollowsButton = (user) => {
        if (user.id === props.authUserId) {
            return
        }

        return user.isFollow 
        ? (
            <button 
                className={s.userFollowButton}
                disabled={ props.followingInProcess.some(fid => fid === user.id) } 
                onClick={ () => props.unfollow(user.id) }
            >Unfollow</button>
        )
        : (
            <button 
                className={s.userFollowButton}
                disabled={ props.followingInProcess.some(fid => fid === user.id) } 
                onClick={ () => props.follow(user.id) }
            >Follow</button>
        )
    }
    const renderUsers = () => {
        let usersJSX = props.users.map( user => {
            let avatarLink = user.avatarImg || "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"
            return (
                <div key={user.id} className={s.userItem}>
                    <div>
                        <div className={s.userItemElementDiv + " " + s.userItemAvatarDivWrapper}>
                            <NavLink className={s.userNameLink} to={`/profile/${user.id}`}>
                                <img className={s.userItemAvatarImg} alt="#" src={avatarLink} />
                            </NavLink>
                        </div>
                        <div className={s.userItemElementDiv}>
                            { renderFollowsButton(user) }
                        </div>
                    </div>
                    <div className={s.userItemElementDiv}>
                        <NavLink className={s.userNameLink} to={`/profile/${user.id}`}>
                            <div className={s.userNameDivWrapper}>
                                {user.name}
                            </div>
                        </NavLink>
                        <div className={s.userStatusWrapper}>
                            {user.status ? user.status : generateStatus()}
                        </div>
                    </div>
                </div>
            )
        })
        return usersJSX
    }

    return (
        <div className={s.usersList}>
            { renderUsers() }
        </div>
    )
}

export default UsersList