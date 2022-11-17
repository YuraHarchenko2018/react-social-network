import React from 'react'

import PaginatorContainer from './elements/paginator/PaginatorContainer'
import UsersListContainer from './elements/users-list/UsersListContainer'

import s from './Users.module.css'


const Users = () => {
    return (
        <div className={s.usersPageWrapper}>
            <UsersListContainer />
            <PaginatorContainer />
        </div>
    )
}

export default Users