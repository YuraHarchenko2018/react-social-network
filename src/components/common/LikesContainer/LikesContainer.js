import React from "react"
import { getAuthUserIdSelector } from "redux/selectors/auth"
import { likePost } from "redux/reducers/profile"
import { likePostNewsPage } from "redux/reducers/news"
import LikeSVG from "../../../assets/like.png"
import s from "./LikeContainer.module.css"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "./../../../hooks/redux.ts"


const LikesContainer = ({ enviroment, postId, postOwnerId, likesCount, likes }) => {
    const dispatch = useAppDispatch()
    const authUserId = useAppSelector(state => getAuthUserIdSelector(state))

    const isLiked = checkIsPostLiked(likes, authUserId)
    const isLikedClass = isLiked ? s.activeColor : s.disableColor

    const handleLikeBtn = () => {
        if (enviroment === "profile") {
            dispatch(likePost(postId, authUserId))
        }
        if (enviroment === "news") {
            dispatch(likePostNewsPage({ postId, authUserId }))
        }
    }

    return (
        <div className={s.likeWrapper}>
            <img alt="#" onClick={handleLikeBtn} className={`${s.likeImg} ${isLikedClass}`} src={LikeSVG} />
            <div className={s.likeText}>{likesCount}</div>
        </div>
    )
}

const checkIsPostLiked = (likes, authUserId) => {
    let isLiked = false

    for (let i = 0; i < likes.length; i++) {
        const userIdLike = likes[i].user.id;
        isLiked = userIdLike === authUserId
    }

    return isLiked
}

export default LikesContainer