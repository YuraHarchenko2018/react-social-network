import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useLoginRedirect from '../../../hooks/useLoginRedirect'
import { fetchFriends } from '../../../redux/reducers/users'
import { getFriendsPerPageSelector, getFriendsSelector } from '../../../redux/selectors/users'
import Preloader from '../../common/Preloader/Preloader'
import Friends from './Friends'

function FriendsContainer() {
  useLoginRedirect()

  const dispatch = useDispatch()

  const friends = useSelector(getFriendsSelector)
  const perPage = useSelector(getFriendsPerPageSelector)

  useEffect(() => {
    dispatch(fetchFriends({ selectedPage: 1, perPage }))
  }, [dispatch, perPage])

  if (friends === null) {
    return <Preloader />
  }

  return <Friends />
}

export default FriendsContainer
