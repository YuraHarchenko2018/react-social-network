import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAuthUserIdSelector } from "redux/selectors/auth"
import { likePost } from "redux/reducers/profile"
import { likePostNewsPage } from "redux/reducers/news"
import LikeSVG from "../../../assets/like.png"

import s from "./LikeContainer.module.css"


const LikesContainer = ({ enviroment, postId, postOwnerId, likesCount, likes }) => {
    const dispatch = useDispatch()
    const authUserId = useSelector(state => getAuthUserIdSelector(state))

    const isLiked = checkIsPostLiked(likes, authUserId)
    const isLikedColor = isLiked ? '#bef5ff' : '#fff'

    const handleLikeBtn = () => {
        if (enviroment === "profile") {
            dispatch(likePost(postId, postOwnerId))
        }
        if (enviroment === "news") {
            // @ts-ignore
            dispatch(likePostNewsPage(postId))
        }
    }

    return (
        <div className={s.likeWrapper}>
            <img alt="#" onClick={handleLikeBtn} className={s.likeImg} style={({ background: isLikedColor })} src={LikeSVG} />
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