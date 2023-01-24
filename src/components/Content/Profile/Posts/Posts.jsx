import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../../redux/reducers/profile'
import { getIsModifiableUserSelector, getUserPostsSelector } from '../../../../redux/selectors/profile'
import AddPostForm from '../../../common/ReduxForms/AddPost/AddPostForm'
import NoPostPreview from './NoPostPreview/NoPostPreview'
import Post from './Post/Post'
import s from './Posts.module.css'

const PostsArea = React.memo(() => {
  const dispatch = useDispatch()

  const posts = useSelector(getUserPostsSelector)
  const isModifiableUser = useSelector(getIsModifiableUserSelector)

  const onSubmit = ({ postText }) => dispatch(addPost(postText))

  return (
    <div className={s.postAreaWrapper}>
      {
        isModifiableUser && <AddPostForm onSubmit={onSubmit} />
      }
      {
        posts.length > 0 ? <Posts posts={posts} environment="profile" /> : <NoPostPreview />
      }
    </div>
  )
})

export function Posts({ posts, environment }) {
  return (
    <div className={s.posts}>
      {
        posts.map((post) => <Post key={post.id} post={post} environment={environment} />)
      }
    </div>
  )
}

export default PostsArea
