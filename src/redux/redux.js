import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/auth'
import dialogsReducer from './reducers/dialogs'
import initReducer from './reducers/init'
import loginReducer from './reducers/login'
import newsReducer from './reducers/news'
import popUpReducer from './reducers/popup'
import profileReducer from './reducers/profile'
import usersReducers from './reducers/users'

let reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersReducers,
    login: loginReducer,
    auth: authReducer,
    init: initReducer,
    popUp: popUpReducer,
    news: newsReducer
})
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)))
// let store = createStore(reducers, applyMiddleware(thunk))

export { store }