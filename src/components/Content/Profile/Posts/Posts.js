import React from "react";
import { addPost } from "redux/reducers/profile";
import { getIsModifyableUserSelector, getUserPostsSelector } from "redux/selectors/profile";
import AddPostForm from "components/common/ReduxForms/AddPost/AddPostForm";
import Post from './Post/Post'
import s from "./Posts.module.css"
// @ts-ignore
import { useAppDispatch, useAppSelector } from "hooks/redux.ts";


const PostsArea = React.memo(() => {
    const dispatch = useAppDispatch()

    const posts = useAppSelector(getUserPostsSelector)
    const isModifyableUser = useAppSelector(getIsModifyableUserSelector)

    const onSubmit = ({ postText }) => dispatch(addPost(postText))

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
            {
                posts.map(post => <Post key={post.id} post={post} enviroment={enviroment} />)
            }
        </div>
    )
}

export default PostsArea