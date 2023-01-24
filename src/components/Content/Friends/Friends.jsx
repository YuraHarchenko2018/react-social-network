import React from 'react'
import SearchFriends from './search/SearchFriends'
import FriendsList from './friends-list/FriendsList'
import FriendsPaginator from './paginator/FriendsPaginator'
import s from '../Users/Users.module.css'

function Friends() {
  return (
    <div className={s.usersPageWrapper}>
      <SearchFriends />
      <FriendsList />
      <FriendsPaginator />
    </div>
  )
}

export default Friends
