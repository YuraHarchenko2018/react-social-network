// action type consts
const ADD_MESSAGE = "ADD-MESSAGE"

let initialState = {
    dialogs: [
      { id: 1, userName: "Yura" },
      { id: 2, userName: "Vova" },
      { id: 3, userName: "Vlad" },
      { id: 4, userName: "Vika" },
      { id: 5, userName: "Tanya" },
    ],
  
    messages: [
      { id: 1, message: "Hi" },
      { id: 2, message: "How are you?" },
      { id: 3, message: "What do you think?" },
      { id: 4, message: "Ok?" },
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: state.messages.length + 1,
                        message: action.payload.message
                    }
                ],
            }
    
        default:
            return state
    }
}

// action creators
export const addMessageCreator = (message) => ({
    type: ADD_MESSAGE,
    payload: {
        message
    }
})

export default dialogsReducer