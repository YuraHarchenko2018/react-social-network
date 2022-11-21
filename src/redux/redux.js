import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux'

import dialogsReducer from './reducers/dialogs'
import loginReducer from './reducers/login'
import profileReducer from './reducers/profile'
import usersReducers from './reducers/users'
import authSlice from './reducers/auth'
import initSlice from './reducers/init'
import popUpSlice from './reducers/popup'
import newsSlice from './reducers/news'

// const reducer = combineReducers({
//     profile: profileReducer,
//     dialogs: dialogsReducer,
//     users: usersReducers,
//     login: loginReducer,
//     auth: authReducer,
//     init: initReducer,
//     popUp: popUpReducer,
//     news: newsReducer
// })

const store = configureStore({
    reducer: {
        profile: profileReducer,
        dialogs: dialogsReducer,
        users: usersReducers,
        login: loginReducer,
        auth: authSlice,
        init: initSlice,
        popUp: popUpSlice,
        news: newsSlice
    }
});

export { store }
