import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { usersAPI } from "api/api"
import { setAuthErrorOccur } from "./auth"


const usersSlice = createSlice({
    name: 'users',
    initialState: {
        /**
         * @property {{
         *  id: number,
         *  name: string,
         *  email: string,
         *  age: number,
         *  status: string,
         *  avatarImg: string,
         *  isFollow: boolean,
         * } | null} users
         */
        users: null,
        friends: null,
        isSearch: false,
        totalUsersCount: 0,
        totalFriendsCount: 0,
        usersPerPage: 5,
        friendsPerPage: 7,
        /**
         * @property {Array<number>} followingInProcess
         */
        followingInProcess: []
    },
    reducers: {
        setFollowStatus(state, action) {
            const { userId, status } = action.payload

            state.users.forEach(user => {
                if (user.id === userId) {
                    user.isFollow = status
                }
            })
        },
        setUsersData(state, action) {
            const { users, totalCount } = action.payload

            state.users = users
            state.totalUsersCount = totalCount
        },
        setIsSearchFlag(state, action) {
            const isSearch = action.payload
            state.isSearch = isSearch
        },
        setFriends(state, action) {
            const { users, totalCount } = action.payload

            state.friends = users
            state.totalFriendsCount = totalCount
        },
        setFollowingInProcess(state, action) {
            const { status, followUserId } = action.payload

            if (status) {
                state.followingInProcess.push(followUserId)
            } else {
                state.followingInProcess = state.followingInProcess.filter(userId => userId !== followUserId)
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, handleExtraFulfilled)
        builder.addCase(follow.fulfilled, handleExtraFulfilled)
        builder.addCase(unfollow.fulfilled, handleExtraFulfilled)
        builder.addCase(fetchUsers.rejected, handleExtraRejected)
        builder.addCase(follow.rejected, handleExtraRejected)
        builder.addCase(unfollow.rejected, handleExtraRejected)
    },
});

const handleExtraFulfilled = (state, action) => {
    console.log('fulfilled below')
    console.log(action.payload)
}

const handleExtraRejected = (state, action) => {
    console.log('rejected below')
    console.log(action.payload)
}

export const {
    setFollowStatus,
    setUsersData,
    setIsSearchFlag,
    setFriends,
    setFollowingInProcess
} = usersSlice.actions


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    /**
     * @param {*} param0
     */
    async ({ selectedPage, perPage }, { rejectWithValue, dispatch }) => {

        try {
            let { users, totalCount } = await usersAPI.getUsers(selectedPage, perPage)
            dispatch(setUsersData({ users, totalCount }))

            return { users, totalCount }
        } catch (error) {
            if (error.response) {
                // set to store flag that mean "something went wrong"
                return rejectWithValue(error.response)
            }
        }
    }
)

export const searchUsers = createAsyncThunk(
    'users/searchUsers',
    /**
     * @param {string} searchParam
     */
    async (searchParam, { rejectWithValue, dispatch }) => {

        try {
            let users = await usersAPI.searchUsers(searchParam)
            dispatch(setUsersData({ users, totalCount: 0 }))
        } catch (error) {
            if (error.response) {
                // set to store flag that mean "something went wrong"
                return rejectWithValue(error.response)
            }
        }
    }
)

export const searchFriends = createAsyncThunk(
    'users/searchFriends',
    /**
     * @param {string} searchParam
     */
    async (searchParam, { rejectWithValue, dispatch }) => {

        try {
            let users = await usersAPI.searchFriends(searchParam)
            dispatch(setFriends({ users, totalCount: 0 }))
        } catch (error) {
            if (error.response) {
                // set to store flag that mean "something went wrong"
                return rejectWithValue(error.response)
            }
        }
    }
)

export const fetchFriends = createAsyncThunk(
    'users/fetchFriends',
    /**
     * @param {*} param0
     */
    async ({ selectedPage, perPage }, { dispatch }) => {
        try {
            let { users, totalCount } = await usersAPI.getFriends(selectedPage, perPage)
            dispatch(setFriends({ users, totalCount }))
        } catch (error) {
            if (error.response) {
                // set to store flag that mean "something went wrong"
                dispatch(setAuthErrorOccur())
            }
        }
    }
)

export const follow = createAsyncThunk(
    'users/follow',
    /**
     * @param {number} userToFollowId
     */
    async (userToFollowId, { rejectWithValue, dispatch }) => {
        dispatch(setFollowingInProcess({ status: true, followUserId: userToFollowId }))

        try {
            let data = await usersAPI.follow(userToFollowId)

            if (data) {
                dispatch(setFollowingInProcess({ status: false, followUserId: userToFollowId }))
                dispatch(setFollowStatus({ status: true, userId: userToFollowId }))
            }

            return data
        } catch (error) {
            if (error.response) {
                if (error.response.status) {
                    // set to store flag that mean "something went wrong"
                    dispatch(setAuthErrorOccur())
                    dispatch(setFollowingInProcess({ status: false, followUserId: userToFollowId }))
                    return rejectWithValue(error.response)
                }
            }
        }
    }
)

export const unfollow = createAsyncThunk(
    'users/unfollow',
    /**
     * @param {number} userToFollowId
     */
    async (userToFollowId, { rejectWithValue, dispatch }) => {
        dispatch(setFollowingInProcess({ status: true, followUserId: userToFollowId }))

        try {
            let data = await usersAPI.unfollow(userToFollowId)

            if (data) {
                dispatch(setFollowingInProcess({ status: false, followUserId: userToFollowId }))
                dispatch(setFollowStatus({ status: false, userId: userToFollowId }))
            }

            return data
        } catch (error) {
            if (error.response) {
                if (error.response.status) {
                    // set to store flag that mean "something went wrong"
                    dispatch(setAuthErrorOccur())
                    dispatch(setFollowingInProcess({ status: false, followUserId: userToFollowId }))
                    return rejectWithValue(error.response)
                }
            }
        }
    }
)


export default usersSlice.reducer
