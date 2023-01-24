/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { authAPI, profileAPI } from '../../api/api'

const authUserIdFromStorage = localStorage.getItem('authUserId')
const jwtFromStorage = localStorage.getItem('jwtToken')
const initialIsLoginIn = jwtFromStorage !== null
const defaultUserImg = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isOccurError: false,
    jwtToken: jwtFromStorage,
    isLoginIn: initialIsLoginIn,
    authUserId: +authUserIdFromStorage,
    authUserProfileImgLink: defaultUserImg,
  },
  reducers: {
    setAuthData(state, action) {
      const { userId, token } = action.payload

      localStorage.setItem('jwtToken', token)
      localStorage.setItem('authUserId', userId)

      state.jwtToken = token
      state.authUserId = +userId
      state.isOccurError = false
      state.isLoginIn = true
    },
    setUserData(state, action) {
      const { userId, isOccurError, isLoginIn } = action.payload

      localStorage.setItem('authUserId', userId)

      state.authUserId = +userId
      state.isOccurError = isOccurError
      state.isLoginIn = isLoginIn
    },
    setAuthErrorOccur(state) {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('authUserId')

      state.jwtToken = ''
      state.authUserId = null
      state.isOccurError = true
      state.isLoginIn = false
      state.authUserProfileImgLink = defaultUserImg
    },
    logout(state) {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('authUserId')

      state.jwtToken = ''
      state.authUserId = null
      state.isOccurError = false
      state.isLoginIn = false
      state.authUserProfileImgLink = defaultUserImg
    },
    setUserAvatar(state, action) {
      state.authUserProfileImgLink = action.payload.profileImg
    },
  },
})

export const {
  setAuthData,
  setUserData,
  setAuthErrorOccur,
  logout,
  setUserAvatar,
} = authSlice.actions

export const isJwtValid = () => async (dispatch) => {
  const authMeData = await authAPI.me()
  dispatch(setUserData(authMeData))
}

export const getUserProfileImg = (userId) => async (dispatch) => {
  try {
    const profileData = await profileAPI.getProfile(userId)
    const profileImg = profileData.avatarImg || defaultUserImg
    dispatch(setUserAvatar({ profileImg }))
  } catch (error) {
    if (error.response) {
      dispatch(setAuthErrorOccur())
    }
  }
}

export default authSlice.reducer
