import React from 'react'
import { fetchUsers } from '../../../redux/reducers/users'
import { getUsersPerPageSelector, getUsersSelector } from '../../../redux/selectors/users'
import useLoginRedirect from '../../../hooks/useLoginRedirect'
import Preloader from '../../common/Preloader/Preloader'
import Users from './Users'
// @ts-ignore
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.ts'

function UsersContainer() {
  useLoginRedirect()

  const dispatch = useAppDispatch()

  const users = useAppSelector(getUsersSelector)
  const perPage = useAppSelector(getUsersPerPageSelector)

  if (users === null) {
    dispatch(fetchUsers({ selectedPage: 1, perPage }))
    return <Preloader />
  }

  return <Users />
}

export default UsersContainer
