import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import { getAuthUserIdSelector } from '../../../redux/selectors/auth'
import { likePost } from '../../../redux/reducers/profile'
import { likePostNewsPage } from '../../../redux/reducers/news'
import LikeSVG from '../../../assets/like.png'
import s from './LikeContainer.module.css'
import checkIsPostLiked from '../../../utils/helpers/checkIsPostLiked';

function LikesContainer({
  environment, postId, likesCount, likes, // postOwnerId
}) {
  const dispatch = useDispatch()
  const authUserId = useSelector(getAuthUserIdSelector)

  const isLiked = checkIsPostLiked(likes, authUserId)
  const isLikedClass = isLiked ? s.activeColor : s.disableColor

  const handleLikeBtn = () => {
    if (environment === 'profile') {
      dispatch(likePost(postId, authUserId))
    }
    if (environment === 'news') {
      dispatch(likePostNewsPage({ postId, authUserId }))
    }
  }

  return (
    <div className={s.likeWrapper}>
      <img
        alt="#"
        onClick={handleLikeBtn}
        className={`${s.likeImg} ${isLikedClass}`}
        src={LikeSVG}
      />
      <div className={s.likeText}>{likesCount}</div>
    </div>
  )
}

LikesContainer.defaultProps = {
  environment: PropTypes.oneOf(['profile', 'news']),
  postId: PropTypes.number,
  postOwnerId: PropTypes.number,
  likesCount: PropTypes.number,
  likes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
}

export default LikesContainer
