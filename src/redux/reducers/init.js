import { getUserProfileImg, isJwtValid } from "./auth"

// action type consts
const SET_INIT = "SET_INIT"

let initialState = {
    isAppInit: false,
}

const initReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INIT:
            return {
                ...state,
                isAppInit: action.payload.isInit
            }
    
        default:
            return state
    }
}

// action creators
export const setInit = (isInit = true) => ({
    type: SET_INIT, 
    payload: {
        isInit
    }
})

// thunk-s
export const initializeApp = (authUserId) => async (dispatch) => {
    dispatch(setInit(false))

    if (authUserId) {
        let checkJwtValidPromise = dispatch(isJwtValid())
        let profileImgPromise = dispatch(getUserProfileImg(authUserId))
        
        await Promise.all([
            checkJwtValidPromise,
            profileImgPromise
        ])
    }

    dispatch(setInit())
}

export default initReducer