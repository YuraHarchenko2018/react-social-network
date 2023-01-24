import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material'
import { fetchUsers } from '../../../../../redux/reducers/users'
import {
  getIsSearchSelector,
  getUsersPagesCountSelector,
  getUsersPerPageSelector,
} from '../../../../../redux/selectors/users'
import s from '../../Users.module.css'

function UsersPaginator() {
  const dispatch = useDispatch()

  const pagesCount = useSelector((state) => getUsersPagesCountSelector(state))
  const perPage = useSelector((state) => getUsersPerPageSelector(state))
  const isSearch = useSelector((state) => getIsSearchSelector(state))

  const handleChange = (event, page) => {
    dispatch(fetchUsers({ selectedPage: page, perPage }))
  }

  if (!isSearch) {
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
  return <div />
}

export default UsersPaginator
