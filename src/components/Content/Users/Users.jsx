import React from 'react'

import SearchUsers from './elements/search/SearchUsers'
import UsersList from './elements/users-list/UsersList'
import UsersPaginator from './elements/paginator/UsersPaginator'

import s from './Users.module.css'

function Users() {
  return (
    <div className={s.usersPageWrapper}>
      <SearchUsers />
      <UsersList />
      <UsersPaginator />
    </div>
  )
}

export default Users
