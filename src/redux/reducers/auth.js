import { authAPI, profileAPI } from "api/api"

// action type consts
const SET_AUTH_DATA = "auth/SET_AUTH_DATA"
const SET_USER_DATA = "auth/SET_USER_DATA"
const SET_AUTH_ERROR_OCCUR = "SET_AUTH_ERROR_OCCUR"
const SET_USER_AVATAR = "SET_USER_AVATAR"
const LOGUOT = "LOGUOT"

const authUserIdFromStorage = localStorage.getItem('authUserId')
const jwtFromStorage = localStorage.getItem('jwtToken')
const initialIsLoginIn = jwtFromStorage !== null ? true : false
const defaultUserImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

let initialState = {
    isOccurError: false,
    jwtToken: jwtFromStorage,
    isLoginIn: initialIsLoginIn,
    authUserId: +authUserIdFromStorage,
    authUserProfileImgLink: defaultUserImg
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            localStorage.setItem('jwtToken', action.token)
            localStorage.setItem('authUserId', action.userId)
            return {
                ...state,
                jwtToken: action.token,
                authUserId: +action.userId,
                isOccurError: false,
                isLoginIn: true
            }
        case SET_USER_DATA:
            localStorage.setItem('authUserId', action.payload.userId)
            return {
                ...state,
                authUserId: +action.payload.userId,
                isOccurError: action.payload.isOccurError,
                isLoginIn: action.payload.isLoginIn
            }
        case SET_AUTH_ERROR_OCCUR: 
            localStorage.removeItem('jwtToken')
            localStorage.removeItem('authUserId')
            return {
                ...state,
                jwtToken: '',
                authUserId: null,
                isOccurError: true,
                isLoginIn: false,
                authUserProfileImgLink: defaultUserImg
            }
        case LOGUOT:
            localStorage.removeItem('jwtToken')
            localStorage.removeItem('authUserId')
            return {
                ...state,
                jwtToken: '',
                authUserId: null,
                isOccurError: false,
                isLoginIn: false,
                authUserProfileImgLink: defaultUserImg
            }
        case SET_USER_AVATAR:
            return {
                ...state,
                authUserProfileImgLink: action.payload.profileImg
            }

    
        default:
            return state
    }
}

// action creators
export const setAuthData = (authData) => ({
    type: SET_AUTH_DATA, 
    token: authData.token, 
    userId: authData.userId
})
export const setUserData = (authData) => ({
    type: SET_USER_DATA, 
    payload: {
        userId: authData.userId,
        isOccurError: authData.isOccurError,
        isLoginIn: authData.isLoginIn
    }
})
export const setUserAvatar = (profileImg) => ({
    type: SET_USER_AVATAR, 
    payload: {
        profileImg
    }
})
export const setAuthErrorOccur = () => ({ type: SET_AUTH_ERROR_OCCUR })
export const logout = (isOccurError) => ({ type: LOGUOT, isOccurError })

export const isJwtValid = () => async (dispatch) => {
    let authMeData = await authAPI.me()
    dispatch(setUserData(authMeData))
}

export const getUserProfileImg = (userId) => async (dispatch) => {
    try {
        const profileData = await profileAPI.getProfile(userId)
        const profileImg = profileData.avatarImg || defaultUserImg
        dispatch(setUserAvatar(profileImg))
    } catch (error) {
        if (error.response) {
          // set to store flag that mean "something went wrong"
          dispatch(setAuthErrorOccur())
        }
    }
}


export default authReducer