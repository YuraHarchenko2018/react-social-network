import { createSlice } from "@reduxjs/toolkit"

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

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addMessage(state, action) {
            const nextId = state.messages.length + 1
            state.messages.push({
                id: nextId,
                message: action.payload.message
            })
        },
    }
});

export const { addMessage } = dialogsSlice.actions;

export default dialogsSlice.reducer