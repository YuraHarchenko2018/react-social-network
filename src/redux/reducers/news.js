import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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
    },
    extraReducers: (builder) => {
      builder.addCase(fetchNews.fulfilled, (state, action) => {
        console.log('fulfilled below')
        console.log(action.payload)
        // state.posts = action.payload;
      })
      builder.addCase(fetchNews.rejected, (state, action) => {
        console.log('rejected below')
        console.log(action.payload)
        // state.posts = action.payload;
      })
      builder.addCase(likePostNewsPage.rejected, (state, action) => {
        console.log('rejected below')
        console.log(action.payload)
        // state.posts = action.payload;
      })
    },
});


export const {
    setNews,
} = newsSlice.actions;


export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const newsPosts = await postsAPI.getPosts()
            dispatch(setNews({ posts: newsPosts }))
            return newsPosts
        } catch (error) {
            if (error.response) {
                dispatch(setAuthErrorOccur())
                return rejectWithValue('fetchNews error')
            }
        }
    }
)

export const likePostNewsPage = createAsyncThunk(
    'news/likePostNewsPage',
    async (postId, thunxAPI) => {
        try {
            let result = await postsAPI.likePost(postId)
            if (result.status) {
                thunxAPI.dispatch(fetchNews())
            } else {
                throw new Error(result.message)
            }
        } catch (error) {
            thunxAPI.dispatch(setAuthErrorOccur())
            return thunxAPI.rejectWithValue(error)
        }
    }
)

export default newsSlice.reducer
