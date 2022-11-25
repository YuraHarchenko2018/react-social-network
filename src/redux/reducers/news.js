import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postsAPI } from "api/api"
import { setAuthErrorOccur } from "./auth"

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        /**
         * @property {{
         *  id: number,
         *  userId: number,
         *  text: string,
         *  created_at: string,
         *  updated_at: string,
         *  user: {
         *          id: number,
         *          name: string,
         *          email: string,
         *          password: string,
         *          age: number,
         *          status: string,
         *          isFollow: boolean,
         *          avatarImg: string,
         *      }
         *  likesCount: number,
         *  likes: {
         *     {
         *      id: number,
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
         *     }
         *  },
         * } | null} posts
         */
        posts: null,
        selectedPage: 1,
        newsPerPage: 5,
        totalNewsAmount: 0
    },
    reducers: {
        setNews(state, action) {
            const { posts } = action.payload
            state.posts = posts;
        },
        setSelectedPage(state, action) {
            const page = action.payload
            state.selectedPage = page
        },
        setAmountNewsPerPage(state, action) {
            const { amount } = action.payload
            state.newsPerPage = amount
        },
        setNewsAmount(state, action) {
            const amount = action.payload
            state.totalNewsAmount = amount
        }
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
    setSelectedPage,
    setAmountNewsPerPage,
    setNewsAmount
} = newsSlice.actions;


export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    /**
     * @param {*} param0
     */
    async ({ selectedPage, perPage }, { rejectWithValue, dispatch }) => {
        try {
            const newsPosts = await postsAPI.getPosts(selectedPage, perPage)
            const newsAmount = await postsAPI.getPostsAmount()
            dispatch(setNewsAmount(newsAmount))
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
    /**
     * @param {number} postId
     */
    async (postId, thunkAPI) => {
        try {
            let result = await postsAPI.likePost(postId)
            if (result.status) {
                thunkAPI.dispatch(fetchNews())
            } else {
                throw new Error(result.message)
            }
        } catch (error) {
            thunkAPI.dispatch(setAuthErrorOccur())
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export default newsSlice.reducer
