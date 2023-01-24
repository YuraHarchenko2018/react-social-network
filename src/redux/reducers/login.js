/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { authAPI } from '../../api/api'
import { setAuthData } from './auth'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isFetching: false,
    isOccurError: false,
  },
  reducers: {
    setIsFetchingLogin(state, action) {
      state.isFetching = action.payload.isFetching
    },
    setIsLoginErrorOccur(state, action) {
      state.isOccurError = action.payload.isOccurError
    },
  },
})

export const {
  setIsFetchingLogin,
  setIsLoginErrorOccur,
} = loginSlice.actions

export const login = (email, password) => async (dispatch) => {
  dispatch(setIsFetchingLogin({ isFetching: true }))

  try {
    const { jwtToken, userId } = await authAPI.login(email, password)
    dispatch(setIsFetchingLogin({ isFetching: false }))
    dispatch(setAuthData({
      token: jwtToken,
      userId,
    }))
  } catch (error) {
    if (error.response) {
      if (error.response.status) {
        // set to store flag that mean "something went wrong"
        dispatch(setIsLoginErrorOccur({ isOccurError: true }))
        dispatch(setIsFetchingLogin({ isFetching: false }))
      }
    }
  }
}

export const signUp = (name, email, password, rePassword, age) => async (dispatch) => {
  dispatch(setIsFetchingLogin({ isFetching: true }))

  try {
    const { jwtToken, userId } = await authAPI.signUp(name, email, password, age)
    dispatch(setIsFetchingLogin({ isFetching: false }))
    dispatch(setAuthData({
      token: jwtToken,
      userId,
    }))
  } catch (error) {
    if (error.response) {
      if (error.response.status) {
        // set to store flag that mean "something went wrong"
        dispatch(setIsLoginErrorOccur({ isOccurError: true }))
        dispatch(setIsFetchingLogin({ isFetching: false }))
      }
    }
  }
}

export default loginSlice.reducer
