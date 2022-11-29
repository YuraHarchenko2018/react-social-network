import React from 'react'

import FriendsList from './friends-list/FriendsList'
import FriendsPaginator from './paginator/FriendsPaginator'

import s from './../Users/Users.module.css'


const Friends = () => {
    return (
        <div className={s.usersPageWrapper}>
            <FriendsList />
            <FriendsPaginator />
        </div>
    )
}

export default Friends