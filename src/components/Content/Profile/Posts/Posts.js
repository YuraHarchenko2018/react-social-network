import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "redux/reducers/profile";
import { getIsModifyableUserSelector, getUserPostsSelector } from "redux/selectors/profile";
import { getAuthUserIdSelector } from "redux/selectors/auth";
import AddPostForm from "components/common/ReduxForms/AddPost/AddPostForm";
import Post from './Post/Post'

import s from "./Posts.module.css"


const PostsArea = React.memo(() => {
    const dispatch = useDispatch()

    const posts = useSelector(state => getUserPostsSelector(state))
    const authUserId = useSelector(state => getAuthUserIdSelector(state))
    const isModifyableUser = useSelector(state => getIsModifyableUserSelector(state))

    const onSubmit = ({ postText }) => addPost(postText, authUserId)(dispatch)

    return (
        <div className={s.postAreaWraper}>
            {
                isModifyableUser && <AddPostForm onSubmit={onSubmit} />
            }
            {
                posts.length > 0 ? <Posts posts={posts} enviroment="profile" /> : <b>No post yet</b>
            }
        </div>
    )
})

export const Posts = ({ posts, enviroment }) => {
    return (
        <div className={s.posts}>
            { posts.map(post => <Post key={post.id} post={post} enviroment={enviroment} />) }
        </div>
    )
}

export default PostsArea