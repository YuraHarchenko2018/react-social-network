import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { getUserInfo, getUserPosts, setProfileUserId } from "redux/reducers/profile"

import Preloader from "components/common/Preloader/Preloader"
import Profile from "./Profile"
import useLoginRedirect from "hooks/useLoginRedirect"
import { getAuthUserIdSelector, getIsLoginInSelector } from "redux/selectors/auth"
import { getProfileUserIdSelector, getUserInfoSelector, getUserPostsSelector } from "redux/selectors/profile"


const ProfileContainer = () => {
    const dispatch = useDispatch()

    const isLoginIn = useSelector(state => getIsLoginInSelector(state))
    const authUserId = useSelector(state => getAuthUserIdSelector(state))
    const profileUserId = useSelector(state => getProfileUserIdSelector(state))
    const userInfo = useSelector(state => getUserInfoSelector(state))
    const posts = useSelector(state => getUserPostsSelector(state))

    useLoginRedirect(isLoginIn)

    let routerParams = useParams();
    let routerUserId = routerParams.userId ?? authUserId
        routerUserId = Number(routerUserId)
    
    useEffect(() => {
        dispatch(setProfileUserId(routerUserId))
    }, [ dispatch, routerUserId ])
    
    if (profileUserId !== null) {
        if (!userInfo) {
            getUserInfo(profileUserId)(dispatch)
            return <Preloader />
        }
        if (!posts) {
            getUserPosts(profileUserId)(dispatch)
            return <Preloader />
        }
    } else {
        return <Preloader />
    }

    return <Profile />
}

export default ProfileContainer