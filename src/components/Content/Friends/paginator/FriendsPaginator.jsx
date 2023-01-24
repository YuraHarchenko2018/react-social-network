import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material'
import { fetchFriends } from '../../../../redux/reducers/users'
import {
  getFriendsPagesCountSelector,
  getFriendsPerPageSelector,
  getIsSearchSelector,
} from '../../../../redux/selectors/users'
import s from '../Friends.module.css'

function FriendsPaginator() {
  const dispatch = useDispatch()

  const pagesCount = useSelector(getFriendsPagesCountSelector)
  const perPage = useSelector(getFriendsPerPageSelector)
  const isSearch = useSelector(getIsSearchSelector)

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
