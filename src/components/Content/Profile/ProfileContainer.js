import React, { useCallback, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { fetchUserInfo, fetchUserPosts, setProfileUserId } from "redux/reducers/profile"

import Preloader from "components/common/Preloader/Preloader"
import Profile from "./Profile"
import useLoginRedirect from "hooks/useLoginRedirect"
import { getAuthUserIdSelector, getIsLoginInSelector } from "redux/selectors/auth"
import { getProfileUserIdSelector, getUserInfoStatusSelector, getUserPostsStatusSelector } from "redux/selectors/profile"


const ProfileContainer = () => {
    const dispatch = useDispatch()

    const isLoginIn = useSelector(state => getIsLoginInSelector(state))
    const authUserId = useSelector(state => getAuthUserIdSelector(state))
    const profileUserId = useSelector(state => getProfileUserIdSelector(state))
    const userInfoStatus = useSelector(state => getUserInfoStatusSelector(state))
    const userPostsStatus = useSelector(state => getUserPostsStatusSelector(state))

    useLoginRedirect(isLoginIn)

    // @ts-ignore
    const getUserInfo = useCallback(() => dispatch(fetchUserInfo(profileUserId)), [dispatch, profileUserId])
    // @ts-ignore
    const getUserPosts = useCallback(() => dispatch(fetchUserPosts(profileUserId)), [dispatch, profileUserId])

    let routerParams = useParams();
    let routerUserId = routerParams.userId ?? authUserId
    routerUserId = Number(routerUserId)

    useEffect(() => { dispatch(setProfileUserId(routerUserId)) }, [dispatch, routerUserId])

    if (profileUserId !== null) {
        !userInfoStatus && getUserInfo()
        !userPostsStatus && getUserPosts()

        if ([userInfoStatus, userPostsStatus].every(status => status === 'ready')) {
            return <Profile />
        }
    }

    return <Preloader />
}

export default ProfileContainer