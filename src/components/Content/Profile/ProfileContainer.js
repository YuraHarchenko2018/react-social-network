import React, { useCallback, useEffect } from "react"
import { fetchUserInfo, fetchUserPosts, setProfileUserId } from "redux/reducers/profile"
import { useParams } from "react-router-dom"

import Preloader from "components/common/Preloader/Preloader"
import Profile from "./Profile"

import useLoginRedirect from "hooks/useLoginRedirect"
import { getAuthUserIdSelector } from "redux/selectors/auth"
import { getProfileUserIdSelector, getUserInfoStatusSelector, getUserPostsStatusSelector } from "redux/selectors/profile"

// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux.ts"


const ProfileContainer = () => {
    useLoginRedirect()

    const dispatch = useAppDispatch()

    const authUserId = useAppSelector(getAuthUserIdSelector)
    const profileUserId = useAppSelector(getProfileUserIdSelector)
    const userInfoStatus = useAppSelector(getUserInfoStatusSelector)
    const userPostsStatus = useAppSelector(getUserPostsStatusSelector)

    const getUserInfo = useCallback(() => dispatch(fetchUserInfo(profileUserId)), [dispatch, profileUserId])
    const getUserPosts = useCallback(() => dispatch(fetchUserPosts(profileUserId)), [dispatch, profileUserId])

    const fetchStatuses = [
        userInfoStatus,
        userPostsStatus
    ]

    const routerParams = useParams();
    const routerUserId = Number(routerParams.userId ?? authUserId)

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
