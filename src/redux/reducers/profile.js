import { postsAPI, profileAPI } from "api/api"
import { setAuthErrorOccur } from "./auth"

// action type consts
const SET_PROFILE_UDER_ID = "profile/SET_PROFILE_UDER_ID"
const ADD_POST = "profile/ADD_POST"
const EDIT_POST_TEXT = "profile/EDIT_POST_TEXT"
const DELETE_POST = "profile/DELETE_POST"
const SET_USER_POSTS = "profile/SET_USER_POSTS"
const UPDATE_USER_INFO = "profile/UPDATE_USER_INFO"
const UPDATE_USER_STATUS = "profile/UPDATE_USER_STATUS"

let initialState = {
    profileUserId: null,
    userInfo: null,
    posts: null,
    isFetchingUserInfo: false,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_UDER_ID: 
            return {
                ...state,
                profileUserId: action.payload.userId,
                userInfo: null,
                posts: null,
            }
        case ADD_POST: // ??? fix id
            return {
                ...state,
                posts: [ 
                    ...state.posts, 
                    {
                        id: state.posts.length + 1,
                        text: action.postText
                    } 
                ],
            }
        case EDIT_POST_TEXT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    return post.id === action.payload.postId ? ({ ...post, text: action.payload.postText }) : post
                })
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(el => el.id !== action.payload.postId)
            }
        case SET_USER_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            }
        case UPDATE_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case UPDATE_USER_STATUS:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    status: action.payload.status
                }
            }
    
        default:
            return state
    }
}


// action creators
export const setPosts = (posts) => ({ type: SET_USER_POSTS, payload: { posts } })
// export const addPostCreator = (postText) => ({ type: ADD_POST, postText })
export const updatePostText = (postId, postText) => ({
    type: EDIT_POST_TEXT,
    payload: {
        postId,
        postText
    }
})
export const deletePostCreator = (postId) => ({ type: DELETE_POST, payload: { postId } })

export const setUserInfo = (userInfo) => ({ type: UPDATE_USER_INFO, userInfo })
export const setProfileUserId = (userId) => ({ type: SET_PROFILE_UDER_ID, payload: { userId } })
export const setUserStatusToState = (userId, status) => ({ type: UPDATE_USER_STATUS, payload: { userId, status } })


// thunx
export const addPost = (postText, authUserId) => async (dispatch) => {
    try {
        // ??? somewhere redo -> get from server new post id and add only one to state
        let result = await postsAPI.addPost(postText)
        if (result) {
            dispatch(getUserPosts(authUserId))
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
            dispatch(updatePostText(postId, postText))
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
            dispatch(deletePostCreator(postId))
        }
    } catch (error) {
        if (error.response) {
          dispatch(setAuthErrorOccur())
        }
    }
}

export const getUserPosts = (userId) => async (dispatch) => {
    try {
        let posts = await postsAPI.getUserPosts(userId)
        dispatch(setPosts(posts))
    } catch (error) {
        if (error.response) {
          dispatch(setAuthErrorOccur())
        }
    }
}

export const getUserInfo = (userId) => async (dispatch) => {
    
    try {
        let profileData = await profileAPI.getProfile(userId)
        dispatch(setUserInfo(profileData))
    } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          // set to store flag that mean "something went wrong"
          dispatch(setAuthErrorOccur())
        }
    }
}

export const setUserStatus = (userId, status) => async (dispatch) => {
    try {
        let result = await profileAPI.setStatus(status)
        if (result.statusCode === 200) {
            dispatch(setUserStatusToState(userId, status))
        } else {
            // bad request
        }
    } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          // set to store flag that mean "something went wrong"
          // dispatch(setAuthErrorOccur())
        }
    }
}

export const likePost = (postId, profileUserId) => async (dispatch) => {
    try {
        let result = await postsAPI.likePost(postId)
        if (result.status) {
            dispatch(getUserPosts(profileUserId))
        } else {
            console.log(result.message)
        }
    } catch (error) {
        if (error.response) {
          dispatch(setAuthErrorOccur())
        }
    }
}

export default profileReducer