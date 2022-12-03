import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

import profileSlice from './reducers/profile'
import dialogsSlice from './reducers/dialogs'
import usersSlice from './reducers/users'
import loginSlice from './reducers/login'
import authSlice from './reducers/auth'
import initSlice from './reducers/init'
import popUpSlice from './reducers/popup'
import newsSlice from './reducers/news'

const reducers = {
    profile: profileSlice,
    dialogs: dialogsSlice,
    users: usersSlice,
    login: loginSlice,
    auth: authSlice,
    init: initSlice,
    popUp: popUpSlice,
    news: newsSlice
}

export const rootReducer = combineReducers({
    ...reducers
})

const setupStore = () => configureStore({
    reducer: rootReducer,
});

export default setupStore
