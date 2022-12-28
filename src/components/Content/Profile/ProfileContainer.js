import React, { useEffect } from "react"
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

    const fetchStatuses = [
        userInfoStatus,
        userPostsStatus
    ]

    const routerParams = useParams();
    const routerUserId = Number(routerParams.userId ?? authUserId)

    useEffect(() => {
        dispatch(setProfileUserId(routerUserId))
    }, [
        routerUserId,
        dispatch
    ])

    useEffect(() => {
        if (profileUserId !== null) {
            !userInfoStatus && dispatch(fetchUserInfo(profileUserId))
            !userPostsStatus && dispatch(fetchUserPosts(profileUserId))
        }
    }, [
        profileUserId,
        userInfoStatus,
        userPostsStatus,
        dispatch
    ])

    if (fetchStatuses.every(status => status === 'ready')) {
        return <Profile />
    }

    return <Preloader />
}

export default ProfileContainer
