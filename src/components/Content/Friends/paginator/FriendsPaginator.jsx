import React from 'react'
import { Pagination } from '@mui/material'
import { fetchFriends } from '../../../../redux/reducers/users'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.ts'
import {
  getFriendsPagesCountSelector,
  getFriendsPerPageSelector,
  getIsSearchSelector,
} from '../../../../redux/selectors/users'
import s from '../Friends.module.css'

function FriendsPaginator() {
  const dispatch = useAppDispatch()

  const pagesCount = useAppSelector(getFriendsPagesCountSelector)
  const perPage = useAppSelector(getFriendsPerPageSelector)
  const isSearch = useAppSelector(getIsSearchSelector)

  const isPaginatorAble = pagesCount > 0

  const handleChange = (event, page) => {
    dispatch(fetchFriends({ selectedPage: page, perPage }))
  }

  if (!isSearch && isPaginatorAble) {
    return (
      <div className={s.paginatorWrapper}>
        <Pagination
          count={pagesCount}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>
    )
  }
  return null
}

export default FriendsPaginator
