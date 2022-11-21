import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux'

import authReducer from './reducers/auth'
import dialogsReducer from './reducers/dialogs'
import initReducer from './reducers/init'
import loginReducer from './reducers/login'
import newsReducer from './reducers/news'
import popUpReducer from './reducers/popup'
import profileReducer from './reducers/profile'
import usersReducers from './reducers/users'

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
        auth: authReducer,
        init: initReducer,
        popUp: popUpReducer,
        news: newsReducer
    }
});

export { store }