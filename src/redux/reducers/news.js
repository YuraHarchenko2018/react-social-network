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
        newsPerPage: 3,
        totalNewsAmount: 0
    },
    reducers: {
        setNews(state, action) {
            const { posts } = action.payload
            state.posts = posts;
        },
        setAmountNewsPerPage(state, action) {
            const { amount } = action.payload
            state.newsPerPage = amount
        },
        setNewsAmount(state, action) {
            const amount = action.payload
            state.totalNewsAmount = amount
        },

        addLikeToPost(state, action) {
            const { postId, likeData } = action.payload

            state.posts.forEach(post => {
                if (post.id === postId) {
                    post.likesCount++
                    post.likes.push(likeData)
                }
            })
        },
        removeLikeOnPost(state, action) {
            const { postId, userId } = action.payload

            state.posts.forEach(post => {
                if (post.id === postId) {
                    post.likesCount--
                    post.likes = post.likes.filter(likeObj => likeObj.user.id !== userId)
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            console.log('fulfilled below')
            console.log(action.payload)
        })
        builder.addCase(fetchNews.rejected, (state, action) => {
            console.log('rejected below')
            console.log(action.payload)
        })
        builder.addCase(likePostNewsPage.rejected, (state, action) => {
            alert('If you want like post, please signup or login')
        })
    },
});

export const {
    setNews,
    setAmountNewsPerPage,
    setNewsAmount,
    addLikeToPost,
    removeLikeOnPost,
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
     * @param {*} param0
     */
    async ({ postId, authUserId }, thunkAPI) => {
        try {
            let result = await postsAPI.likePost(postId)
            if (result.status) {
                if (result.likeData) {
                    thunkAPI.dispatch(addLikeToPost({ postId, likeData: result.likeData }))
                } else {
                    thunkAPI.dispatch(removeLikeOnPost({ postId, userId: authUserId }))
                }
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
