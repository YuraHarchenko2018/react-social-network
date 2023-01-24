import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../redux/reducers/users'
import { getUsersPerPageSelector, getUsersSelector } from '../../../redux/selectors/users'
import useLoginRedirect from '../../../hooks/useLoginRedirect'
import Preloader from '../../common/Preloader/Preloader'
import Users from './Users'

function UsersContainer() {
  useLoginRedirect()

  const dispatch = useDispatch()

  const users = useSelector(getUsersSelector)
  const perPage = useSelector(getUsersPerPageSelector)

  if (users === null) {
    dispatch(fetchUsers({ selectedPage: 1, perPage }))
    return <Preloader />
  }

  return <Users />
}

export default UsersContainer
