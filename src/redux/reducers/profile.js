import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postsAPI, profileAPI } from "api/api"
import { setAuthErrorOccur } from "./auth"

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
        userPostsStatus: null
    },
    reducers: {
        setProfileUserId(state, action) {
            const userId = action.payload

            state.profileUserId = userId
            state.userInfoStatus = null
            state.userPostsStatus = null
        },
        setPostText(state, action) {
            const { postId, postText } = action.payload

            state.posts.forEach(post => {
                if (post.id === postId) {
                    post.text = postText
                }
            })
        },
        removePost(state, action) {
            const postId = action.payload
            state.posts = state.posts.filter(post => post.id !== postId)
        },
        setUserPosts(state, action) {
            const posts = action.payload
            state.posts = posts
        },
        setUserInfo(state, action) {
            const userInfo = action.payload
            state.userInfo = userInfo
        },
        setUserStatus(state, action) {
            const status = action.payload
            state.userInfo.status = status
        }
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
});

export const {
    setProfileUserId,
    setPostText,
    removePost,
    setUserPosts,
    setUserInfo,
    setUserStatus
} = profileSlice.actions


// thunx
export const fetchUserInfo = createAsyncThunk(
    'profile/fetchUserInfo',
    /**
     * @param {number} userId
     */
    async (userId, { rejectWithValue, dispatch }) => {
        try {
            let profileData = await profileAPI.getProfile(userId)
            dispatch(setUserInfo(profileData))
            return profileData
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                // set to store flag that mean "something went wrong"
                dispatch(setAuthErrorOccur())
                return rejectWithValue(error.response)
            }
        }
    }
)

export const updateUserStatus = createAsyncThunk(
    'profile/updateUserStatus',
    /**
     * @param {string} status
     */
    async (status, { rejectWithValue, dispatch }) => {
        try {
            let result = await profileAPI.setStatus(status)
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
    }
)

export const fetchUserPosts = createAsyncThunk(
    'profile/fetchUserPosts',
    /**
     * @param {number} userId
     */
    async (userId, { rejectWithValue, dispatch }) => {
        try {
            let posts = await postsAPI.getUserPosts(userId)
            dispatch(setUserPosts(posts))
            return posts
        } catch (error) {
            if (error.response) {
                dispatch(setAuthErrorOccur())
                return rejectWithValue(error.response)
            }
        }
    }
)

export const addPost = (postText, authUserId) => async (dispatch) => {
    try {
        // ??? somewhere redo -> get from server new post id and add only one to state
        let result = await postsAPI.addPost(postText)
        if (result) {
            dispatch(fetchUserPosts(authUserId))
            // dispatch(addPostCreator(text, newPostId))
        }
    } catch (error) {
        if (error.response) {
            dispatch(setAuthErrorOccur())
        }
    }
}

export const updatePost = (postId, postText) => async (dispatch) => {
    try {
        let result = await postsAPI.updatePost(postId, postText)
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
        let result = await postsAPI.deletePost(postId)
        if (result) {
            dispatch(removePost(postId))
        }
    } catch (error) {
        if (error.response) {
            dispatch(setAuthErrorOccur())
        }
    }
}

export const likePost = (postId, profileUserId) => async (dispatch) => {
    try {
        let result = await postsAPI.likePost(postId)
        if (result.status) {
            dispatch(fetchUserPosts(profileUserId))
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