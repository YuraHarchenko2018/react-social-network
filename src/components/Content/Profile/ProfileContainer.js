import React, { useCallback, useEffect } from "react"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux.ts"
import { fetchUserInfo, fetchUserPosts, setProfileUserId } from "redux/reducers/profile"
import { useParams } from "react-router-dom"

import Preloader from "components/common/Preloader/Preloader"
import Profile from "./Profile"

import useLoginRedirect from "hooks/useLoginRedirect"
import { getAuthUserIdSelector } from "redux/selectors/auth"
import { getProfileUserIdSelector, getUserInfoStatusSelector, getUserPostsStatusSelector } from "redux/selectors/profile"


const ProfileContainer = () => {
    useLoginRedirect()

    const dispatch = useAppDispatch()

    const authUserId = useAppSelector(state => getAuthUserIdSelector(state))
    const profileUserId = useAppSelector(state => getProfileUserIdSelector(state))
    const userInfoStatus = useAppSelector(state => getUserInfoStatusSelector(state))
    const userPostsStatus = useAppSelector(state => getUserPostsStatusSelector(state))

    const getUserInfo = useCallback(() => dispatch(fetchUserInfo(profileUserId)), [dispatch, profileUserId])
    const getUserPosts = useCallback(() => dispatch(fetchUserPosts(profileUserId)), [dispatch, profileUserId])

    const fetchStatuses = [
        userInfoStatus,
        userPostsStatus
    ]

    let routerParams = useParams();
    let routerUserId = routerParams.userId ?? authUserId
    routerUserId = Number(routerUserId)

    useEffect(() => { dispatch(setProfileUserId(routerUserId)) }, [dispatch, routerUserId])

    if (profileUserId !== null) {
        !userInfoStatus && getUserInfo()
        !userPostsStatus && getUserPosts()

        if (fetchStatuses.every(status => status === 'ready')) {
            return <Profile />
        }
    }

    return <Preloader />
}

export default ProfileContainer