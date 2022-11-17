import { postsAPI } from "api/api"
import { setAuthErrorOccur } from "./auth"

// action type consts
const GET_POSTS = "news/GET_POSTS"

let initialState = {
    posts: null,
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
            }
    
        default:
            return state
    }
}

// action creators
export const setNews = (posts) => ({
    type: GET_POSTS, 
    payload: {
        posts
    }
})

// thunx
export const getNews = () => async (dispatch) => {
    try {
        const newsPosts = await postsAPI.getPosts()
        dispatch(setNews(newsPosts))
    } catch (error) {
        if (error.response) {
          dispatch(setAuthErrorOccur())
        }
    }
}

export const likeNewsPost = (postId) => async (dispatch) => {
    try {
        let result = await postsAPI.likePost(postId)
        if (result.status) {
            dispatch(getNews())
        } else {
            console.log(result.message)
        }
    } catch (error) {
        if (error.response) {
          dispatch(setAuthErrorOccur())
        }
    }
}


export default newsReducer