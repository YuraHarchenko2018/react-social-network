// action type consts
const SET_CONTENT = "SET_CONTENT"
const SET_IS_SHOW = "SET_IS_SHOW"
const SET_PAYLOAD = "SET_PAYLOAD"

let initialState = {
    content: 'default',
    isShow: false,
    payload: null
}

const popUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTENT:
            return {
                ...state,
                content: action.payload.content
            }
        case SET_IS_SHOW:
            return {
                ...state,
                isShow: action.payload.isShow
            }
        case SET_PAYLOAD:
            return {
                ...state,
                payload: action.payload
            }
    
        default:
            return state
    }
}

// action creators
export const setContentForPopUp = (content = 'default') => ({
    type: SET_CONTENT, 
    payload: {
        content
    }
})

export const setIsShowPopUp = (isShow = true) => ({
    type: SET_IS_SHOW, 
    payload: {
        isShow
    }
})

export const setPayloadForPopUp = (payload) => ({ type: SET_PAYLOAD, payload })

export default popUpReducer