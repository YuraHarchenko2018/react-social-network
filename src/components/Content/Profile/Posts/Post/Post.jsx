import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAuthUserIdSelector } from '../../../../../redux/selectors/auth'
import { setContent, setIsShow, setPayload } from '../../../../../redux/reducers/popup'
import getFormattedDate from '../../../../../utils/helpers/formatDate'
import OptionsWindow from '../../../../common/OptionsWindow/OptionsWindow'
import LikesContainer from '../../../../common/LikesContainer/LikesContainer'
import { serverLink } from '../../../../../constants/common'
import s from './Post.module.css'

function Post(props) {
  const {
    post: {
      id, likesCount, likes, userId,
    }, environment,
  } = props

  return (
    <div className={s.post}>
      <OptionsContainer environment={props.environment} {...props.post} />
      <PostCreatorInfoContainer {...props.post.user} />
      <PostTextContainer {...props.post} />
      <LikesContainer
        environment={environment}
        postId={id}
        postOwnerId={userId}
        likesCount={likesCount}
        likes={likes}
      />
      <DateContainer {...props.post} />
    </div>
  )
}

function OptionsContainer({
  id, userId, text, environment,
}) {
  const dispatch = useDispatch()
  const authUserId = useSelector(getAuthUserIdSelector)

  const isModifiableUser = userId === authUserId

  const handleUpdateBtn = () => {
    dispatch(setContent({ content: 'updatePostText' }))
    dispatch(setPayload({ postId: id, postText: text }))
    dispatch(setIsShow({ isShow: true }))
  }
  const handleDeleteBtn = () => {
    dispatch(setContent({ content: 'deletePost' }))
    dispatch(setPayload({ postId: id }))
    dispatch(setIsShow({ isShow: true }))
  }

  const buttonsSettings = [
    {
      id: 1,
      text: 'Edit',
      onClickFunc: handleUpdateBtn,
    },
    {
      id: 2,
      text: 'Delete',
      onClickFunc: handleDeleteBtn,
    },
  ]

  return (
    <div>
      {
        environment === 'profile' && isModifiableUser && <OptionsWindow buttonsSettings={buttonsSettings} />
      }
    </div>
  )
}

function PostCreatorInfoContainer({ id, name, avatarImg }) {
  const avatar = serverLink + avatarImg

  return (
    <div className={s.postUserInfo}>
      <NavLink className={s.userNameLink} to={`/profile/${id}`}>
        <img className={s.postAvatar} alt="#" src={avatar} />
      </NavLink>
      <NavLink className={`${s.userNameLink} ${s.postOwnerName}`} to={`/profile/${id}`}>
        <b>{name}</b>
      </NavLink>
    </div>
  )
}

function PostTextContainer({ text }) {
  return <p>{text}</p>
}

function DateContainer(props) {
  const dateTitle = getFormattedDate(props.created_at)

  return (
    <div className={s.createdAtTitle}>
      {dateTitle}
    </div>
  )
}

export default Post
