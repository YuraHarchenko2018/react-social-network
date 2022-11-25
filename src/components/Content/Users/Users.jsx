import React from 'react'

import UsersList from './elements/users-list/UsersList'
import PaginatorContainer from './elements/paginator/PaginatorContainer'

import s from './Users.module.css'


const Users = () => {
    return (
        <div className={s.usersPageWrapper}>
            <UsersList />
            <PaginatorContainer />
        </div>
    )
}

export default Users