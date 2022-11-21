import { createSlice } from "@reduxjs/toolkit"
import { postsAPI } from "api/api"
import { setAuthErrorOccur } from "./auth"

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        posts: null,
    },
    reducers: {
      setNews(state, action) {
        const { posts } = action.payload
        state.posts = posts;
      },
    }
});


export const {
    setNews,
} = newsSlice.actions;


export const getNews = () => async (dispatch) => {
    try {
        const newsPosts = await postsAPI.getPosts()
        dispatch(setNews({ posts: newsPosts }))
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

export default newsSlice.reducer