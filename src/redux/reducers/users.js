import { usersAPI } from "api/api"
import { setAuthErrorOccur } from "./auth"

const FOLLOW = 'FOLLOW'
const SET_USERS = 'SET_USERS'
const SET_SELECTED_PAGE = 'SET_SELECTED_PAGE'
const SET_IS_FETCHING_USERS = 'SET_IS_FETCHING_USERS'
const SET_FOLLOWING_IN_PROCESS = 'SET_FOLLOWING_IN_PROCESS'

const initialState = {
    users: null,
    totalUsersCount: 0,
    perPage: 5,
    selectedPage: 1,
    isFetching: true,
    followingInProcess: []
}

const usersReducers = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            if (action.payload.status) {
                return {
                    ...state,
                    users: state.users.map(user => user.id === action.payload.userId ? { ...user, isFollow: true } : user)
                }
            } else {
                return {
                    ...state,
                    users: state.users.map(user => user.id === action.payload.userId ? { ...user, isFollow: false } : user)
                }
            }
        case SET_USERS:
            return {
                ...state,
                users: [
                    ...action.payload.users
                ],
                totalUsersCount: action.payload.totalCount
            }
        case SET_SELECTED_PAGE:
            return {
                ...state,
                selectedPage: action.payload.page
            }
        case SET_IS_FETCHING_USERS:
            return {
                ...state,
                isFetching: action.payload.isFetching
            }
        case SET_FOLLOWING_IN_PROCESS:
            if (action.payload.status) {
                return {
                    ...state,
                    followingInProcess: [...state.followingInProcess, action.payload.followUserId]
                }
            } else {
                return {
                    ...state,
                    followingInProcess: 
                        state.followingInProcess.filter(followUserId => followUserId !== action.payload.followUserId)
                }
            }
    
        default:
            return state
    }
}


export const setFollowStatus = (status, userId) => ({
    type: FOLLOW,
    payload: {
        status,
        userId
    }
})
export const setUsersData = (users, totalCount) => ({
    type: SET_USERS,
    payload: {
        users,
        totalCount
    }
})
export const setFollowingInProcess = (status, followUserId) => ({
    type: SET_FOLLOWING_IN_PROCESS, 
    payload: {
        status, 
        followUserId
    }
})
export const setSelectedPage = (page) => ({
    type: SET_SELECTED_PAGE,
    payload: {
        page
    }
})
export const setIsFetchingUser = (isFetching) => ({
    type: SET_IS_FETCHING_USERS,
    payload: {
        isFetching
    }
})

export const getUsers = (page = 1) => async (dispatch) => {
    dispatch(setIsFetchingUser(true))
    
    try {
        let { users, totalCount } = await usersAPI.getUsers(page)
        dispatch(setUsersData(users, totalCount))
        dispatch(setIsFetchingUser(false))
    } catch (error) {
        if (error.response) {
          // set to store flag that mean "something went wrong"
          dispatch(setAuthErrorOccur())
          dispatch(setIsFetchingUser(false))
        }
    }
}

export const follow = (userToFollowId) => async (dispatch) => {
    dispatch(setFollowingInProcess(true, userToFollowId))

    try {
        let data = await usersAPI.follow(userToFollowId)
    
        if (data) {
            dispatch(setFollowingInProcess(false, userToFollowId))
            dispatch(setFollowStatus(true, userToFollowId))
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status) {
                // set to store flag that mean "something went wrong"
                dispatch(setAuthErrorOccur())
                dispatch(setFollowingInProcess(false, userToFollowId))
            }
        }
    }
}

export const unfollow = (userToFollowId) => async (dispatch) => {
    dispatch(setFollowingInProcess(true, userToFollowId))

    try {
        let data = await usersAPI.unfollow(userToFollowId)
    
        if (data) {
            dispatch(setFollowingInProcess(false, userToFollowId))
            dispatch(setFollowStatus(false, userToFollowId))
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status) {
                // set to store flag that mean "something went wrong"
                dispatch(setAuthErrorOccur())
                dispatch(setFollowingInProcess(false, userToFollowId))
            }
        }
    }
}


export default usersReducers