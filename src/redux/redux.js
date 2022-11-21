import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

import profileReducer from './reducers/profile'
import dialogsSlice from './reducers/dialogs'
import usersReducers from './reducers/users'
import loginSlice from './reducers/login'
import authSlice from './reducers/auth'
import initSlice from './reducers/init'
import popUpSlice from './reducers/popup'
import newsSlice from './reducers/news'

const reducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsSlice,
    users: usersReducers,
    login: loginSlice,
    auth: authSlice,
    init: initSlice,
    popUp: popUpSlice,
    news: newsSlice
})

const store = configureStore({ reducer });

export { store }
