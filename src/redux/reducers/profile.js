/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postsAPI, profileAPI } from '../../api/api'
import { getUserProfileImg, setAuthErrorOccur } from './auth'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    /**
         * @property {{
         *  id: number,
         *  name: string,
         *  email: string,
         *  age: number,
         *  status: string,
         *  avatarImg: string,
         * }} userInfo
         */
    userInfo: null,
    /**
         * @property {[
         *   {
         *      id: number,
         *      userId: number,
         *      text: string,
         *      created_at: string,
         *      updated_at: string,
         *      likesCount: number,
         *      likes: [
         *        {
         *          id: number,
         *          user: {
         *             id: number
         *          }
         *        }
         *      ],
         *      user: {
         *          id: number,
         *          name: string,
         *          email: string,
         *          password: string,
         *          age: number,
         *          status: string,
         *          isFollow: boolean,
         *          avatarImg: string,
         *      }
         *   }
         * ]} posts
         */
    posts: null,
    profileUserId: null,
    /**
         * @property {null | 'pending' | 'ready'} userInfoStatus
         */
    userInfoStatus: null,
    /**
         * @property {null | 'pending' | 'ready'} userPostsStatus
         */
    userPostsStatus: null,
  },
  reducers: {
    setProfileUserId(state, action) {
      const userId = action.payload

      state.profileUserId = userId
      state.userInfoStatus = null
      state.userPostsStatus = null
    },
    addLikeToPost(state, action) {
      const { postId, likeData } = action.payload

      /* with immer */
      state.posts.forEach((post) => {
        if (post.id === postId) {
          post.likesCount += 1
          post.likes.push(likeData)
        }
      })

      /* immutable */
      // return {
      //     ...state,
      //     posts: state.posts.map(post => {
      //         if (post.id === postId) {
      //             return {
      //                 ...post,
      //                 likesCount: post.likesCount + 1,
      //                 likes: [
      //                     ...post.likes,
      //                     likeData
      //                 ]
      //             }
      //         }
      //         return post
      //     })
      // }
    },
    removeLikeOnPost(state, action) {
      const { postId, userId } = action.payload

      /* with immer */
      state.posts.forEach((post) => {
        if (post.id === postId) {
          post.likesCount -= 1
          post.likes = post.likes.filter((likeObj) => likeObj.user.id !== userId)
        }
      })

      /* immutable */
      // return {
      //     ...state,
      //     posts: state.posts.map(post => {
      //         if (post.id === postId) {
      //             return {
      //                 ...post,
      //                 likesCount: post.likesCount - 1,
      //                 likes: post.likes.filter(likeObj => likeObj.user.id !== userId)
      //             }
      //         }
      //         return post
      //     })
      // }
    },
    setPostText(state, action) {
      const { postId, postText } = action.payload

      state.posts.forEach((post) => {
        if (post.id === postId) {
          post.text = postText
        }
      })
    },
    removePost(state, action) {
      const postId = action.payload
      state.posts = state.posts.filter((post) => post.id !== postId)
    },
    setUserPosts(state, action) {
      const posts = action.payload
      state.posts = posts
    },
    setOnePost(state, action) {
      const post = action.payload
      state.posts.push(post)
    },
    setUserInfo(state, action) {
      const userInfo = action.payload
      state.userInfo = userInfo
    },
    setUserStatus(state, action) {
      const status = action.payload
      state.userInfo.status = status
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state) => {
      state.userInfoStatus = 'ready'
    })
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.userInfoStatus = 'pending'
    })
    builder.addCase(fetchUserPosts.fulfilled, (state) => {
      state.userPostsStatus = 'ready'
    })
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.userPostsStatus = 'pending'
    })
  },
})

export const {
  setProfileUserId,
  setPostText,
  removePost,
  setUserPosts,
  setUserInfo,
  setUserStatus,
  addLikeToPost,
  removeLikeOnPost,
  setOnePost,
} = profileSlice.actions

export const fetchUserInfo = createAsyncThunk(
  'profile/fetchUserInfo',
  /**
     * @param {number} userId
     */
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const profileData = await profileAPI.getProfile(userId)
      dispatch(setUserInfo(profileData))
      return profileData
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        // set to store flag that mean "something went wrong"
        dispatch(setAuthErrorOccur())
        return rejectWithValue(error.response)
      }
    }
  },
)

export const updateUserInfo = createAsyncThunk(
  'profile/updateUserInfo',
  /**
     * @param {object} data
     */
  async (data, { rejectWithValue, dispatch }) => {
    const {
      userId, file, name, age,
    } = data
    try {
      const result = await profileAPI.updateUserInfo(file, name, age)
      if (result) {
        dispatch(fetchUserInfo(userId))
        dispatch(fetchUserPosts(userId))
        dispatch(getUserProfileImg(userId))
      } else {
        throw new Error('Some error with update user info')
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        // set to store flag that mean "something went wrong"
        dispatch(setAuthErrorOccur())
        return rejectWithValue(error.response)
      }
    }
  },
)

export const updateUserStatus = createAsyncThunk(
  'profile/updateUserStatus',
  /**
     * @param {string} status
     */
  async (status, { rejectWithValue, dispatch }) => {
    try {
      const result = await profileAPI.setStatus(status)
      if (result.statusCode === 200) {
        dispatch(setUserStatus(status))
        return status
      }
    } catch (error) {
      if (error.response) {
        dispatch(setAuthErrorOccur())
        return rejectWithValue(error.response.data)
      }
    }
  },
)

export const fetchUserPosts = createAsyncThunk(
  'profile/fetchUserPosts',
  /**
     * @param {number} userId
     */
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const posts = await postsAPI.getUserPosts(userId)
      dispatch(setUserPosts(posts))
      return posts
    } catch (error) {
      if (error.response) {
        dispatch(setAuthErrorOccur())
        return rejectWithValue(error.response)
      }
    }
  },
)

export const addPost = (postText) => async (dispatch) => {
  try {
    const result = await postsAPI.addPost(postText)
    if (result.status) {
      dispatch(setOnePost(result.post))
    }
  } catch (error) {
    if (error.response) {
      dispatch(setAuthErrorOccur())
    }
  }
}

export const updatePost = (postId, postText) => async (dispatch) => {
  try {
    const result = await postsAPI.updatePost(postId, postText)
    if (result.status) {
      dispatch(setPostText({ postId, postText }))
    }
  } catch (error) {
    if (error.response) {
      dispatch(setAuthErrorOccur())
    }
  }
}

export const deletePost = (postId) => async (dispatch) => {
  try {
    const result = await postsAPI.deletePost(postId)
    if (result) {
      dispatch(removePost(postId))
    }
  } catch (error) {
    if (error.response) {
      dispatch(setAuthErrorOccur())
    }
  }
}

export const likePost = (postId, authUserId) => async (dispatch) => {
  try {
    const result = await postsAPI.likePost(postId)
    if (result.status) {
      if (result.likeData) {
        dispatch(addLikeToPost({ postId, likeData: result.likeData }))
      } else {
        dispatch(removeLikeOnPost({ postId, userId: authUserId }))
      }
    } else {
      console.log(result.message)
    }
  } catch (error) {
    if (error.response) {
      dispatch(setAuthErrorOccur())
    }
  }
}

export default profileSlice.reducer
