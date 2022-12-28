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
        posts: [],
        newsPerPage: 5,
        totalNewsAmount: 0,
        isLoading: false,
    },
    reducers: {
        setNews(state, action) {
            const { posts } = action.payload
            // state.posts = [...posts, ...state.posts];
            return {
                ...state,
                posts: posts === null ? [] : [
                    ...posts,
                    ...state.posts
                ]
            }
        },
        setAmountNewsPerPage(state, action) {
            const { amount } = action.payload
            state.newsPerPage = amount
        },
        setNewsAmount(state, action) {
            const amount = action.payload
            state.totalNewsAmount = amount
        },
        setIsLoading(state, action) {
            const loadingStatus = action.payload
            state.isLoading = loadingStatus
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
        builder.addCase(fetchNews.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(fetchNews.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchNews.rejected, (state) => {
            state.isLoading = false
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
    setIsLoading,
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
