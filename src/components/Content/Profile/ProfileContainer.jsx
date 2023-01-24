import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../common/Preloader/Preloader'
import Profile from './Profile'
import { fetchUserInfo, fetchUserPosts, setProfileUserId } from '../../../redux/reducers/profile'
import useLoginRedirect from '../../../hooks/useLoginRedirect'
import { getAuthUserIdSelector } from '../../../redux/selectors/auth'
import {
  getProfileUserIdSelector,
  getUserInfoStatusSelector,
  getUserPostsStatusSelector,
} from '../../../redux/selectors/profile'

function ProfileContainer() {
  useLoginRedirect()

  const dispatch = useDispatch()

  const authUserId = useSelector(getAuthUserIdSelector)
  const profileUserId = useSelector(getProfileUserIdSelector)
  const userInfoStatus = useSelector(getUserInfoStatusSelector)
  const userPostsStatus = useSelector(getUserPostsStatusSelector)

  const fetchStatuses = [
    userInfoStatus,
    userPostsStatus,
  ]

  const routerParams = useParams()
  const routerUserId = Number(routerParams.userId ?? authUserId)

  useEffect(() => {
    dispatch(setProfileUserId(routerUserId))
  }, [
    routerUserId,
    dispatch,
  ])

  useEffect(() => {
    if (profileUserId !== null && !userInfoStatus) {
      dispatch(fetchUserInfo(profileUserId))
    }
    if (profileUserId !== null && !userPostsStatus) {
      dispatch(fetchUserPosts(profileUserId))
    }
  }, [
    dispatch,
    profileUserId,
    userInfoStatus,
    userPostsStatus,
  ])

  if (fetchStatuses.every((status) => status === 'ready')) {
    return <Profile />
  }

  return <Preloader />
}

export default ProfileContainer
