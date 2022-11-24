import { createSlice } from "@reduxjs/toolkit"
import { getUserProfileImg, isJwtValid } from "./auth"

const initSlice = createSlice({
    name: 'init',
    initialState: {
        isAppInit: false,
    },
    reducers: {
        init(state, action) {
            state.isAppInit = action.payload.isInit
        },
    }
});

export const {
    init,
} = initSlice.actions;

// thunk
export const initializeApp = (authUserId) => async (dispatch) => {
    dispatch(init({ isInit: false }))

    if (authUserId) {
        let checkJwtValidPromise = dispatch(isJwtValid())
        let profileImgPromise = dispatch(getUserProfileImg(authUserId))

        await Promise.all([
            checkJwtValidPromise,
            profileImgPromise
        ])
    }

    dispatch(init({ isInit: true }))
}

export default initSlice.reducer