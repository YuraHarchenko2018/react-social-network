import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAuthUserIdSelector } from "redux/selectors/auth";
import { setContent, setIsShow, setPayload } from "redux/reducers/popup";
import { getFormattedDate } from "utils/helpers/formatDate";
import OptionsWindow from "components/common/OptionsWindow/OptionsWindow";
import LikesContainer from "components/common/LikesContainer/LikesContainer";
import { serverLink } from "constants/common";
import s from "./Post.module.css"


const Post = (props) => {
    const { post: { id, likesCount, likes, userId }, enviroment } = props

    return (
        <div className={s.post}>
            <OptionsContainer enviroment={props.enviroment} {...props.post} />
            <PostCreatorInfoContainer {...props.post.user} />
            <PostTextContainer {...props.post} />
            <LikesContainer enviroment={enviroment} postId={id} postOwnerId={userId} likesCount={likesCount} likes={likes} />
            <DateContainer {...props.post} />
        </div>
    )
}

const OptionsContainer = ({ id, userId, text, enviroment }) => {
    const dispatch = useDispatch()
    const authUserId = useSelector(getAuthUserIdSelector)

    const isModifyableUser = userId === authUserId

    const handleUpdateBtn = () => {
        dispatch(setContent({ content: "updatePostText" }))
        dispatch(setPayload({ postId: id, postText: text }))
        dispatch(setIsShow({ isShow: true }))
    }
    const handleDeleteBtn = () => {
        dispatch(setContent({ content: "deletePost" }))
        dispatch(setPayload({ postId: id }))
        dispatch(setIsShow({ isShow: true }))
    }

    const buttonsSettings = [
        {
            id: 1,
            text: "Edit",
            onClickFunc: handleUpdateBtn
        },
        {
            id: 2,
            text: "Delete",
            onClickFunc: handleDeleteBtn
        }
    ]

    return (
        <>
            {
                enviroment === "profile" && isModifyableUser && <OptionsWindow buttonsSettings={buttonsSettings} />
            }
        </>
    )
}

const PostCreatorInfoContainer = ({ id, name, avatarImg }) => {
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

const PostTextContainer = ({ text }) => {
    return <p>{text}</p>
}

const DateContainer = ({ created_at }) => {
    const dateTitle = getFormattedDate(created_at)

    return (
        <div className={s.createdAtTitle}>
            {dateTitle}
        </div>
    )
}

export default Post
