import React from 'react'

import UsersList from './elements/users-list/UsersList'
import UsersPaginator from './elements/paginator/UsersPaginator'

import s from './Users.module.css'


const Users = () => {
    return (
        <div className={s.usersPageWrapper}>
            <UsersList />
            <UsersPaginator />
        </div>
    )
}

export default Users