import { authAPI } from "api/api"
import { setAuthData } from "./auth"

const SET_IS_FETCHING_LOGIN = 'SET_IS_FETCHING_LOGIN'
const SET_IS_LOGIN_ERROR_OCCUR = 'SET_IS_LOGIN_ERROR_OCCUR'

const initialState = {
    isFetching: false,
    isOccurError: false
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_FETCHING_LOGIN:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_IS_LOGIN_ERROR_OCCUR:
            return {
                ...state,
                isOccurError: action.isError
            }
    
        default:
            return state
    }
}

export const setIsFetchingLogin = (isFetching) => ({ type: SET_IS_FETCHING_LOGIN, isFetching })
export const setIsLoginErrorOccur = (isError) => ({ type: SET_IS_LOGIN_ERROR_OCCUR, isError })

export const login = (email, password) => async (dispatch) => {

    dispatch(setIsFetchingLogin(true))

    try {
        let { jwtToken, userId } = await authAPI.login(email, password)
            dispatch(setIsFetchingLogin(false))
            dispatch(setAuthData({
                token: jwtToken,
                userId: userId
            }))
    } catch(error) {
        if (error.response) {
            if (error.response.status) {
                // set to store flag that mean "something went wrong"
                dispatch(setIsLoginErrorOccur(true))
                dispatch(setIsFetchingLogin(false))
            }
        }
    }
}

export const signUp = (name, email, password, rePassword, age) => async (dispatch) => {

    dispatch(setIsFetchingLogin(true))

    try {
        let { jwtToken, userId } = await authAPI.signUp(name, email, password, age)
            dispatch(setIsFetchingLogin(false))
            dispatch(setAuthData({
                token: jwtToken,
                userId: userId
            }))
    } catch(error) {
        if (error.response) {
            if (error.response.status) {
                // set to store flag that mean "something went wrong"
                dispatch(setIsLoginErrorOccur(true))
                dispatch(setIsFetchingLogin(false))
            }
        }
    }
}

export default loginReducer