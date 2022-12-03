import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    /**
     * @property {[{
     *  id: number,
     *  name: string,
     *  avatarImg: string,
     * }] | null} dialogs
     */
    dialogs: [
        { id: 1, name: "Yura", avatarImg: "imgLink" },
        { id: 2, name: "Vova", avatarImg: "imgLink" },
        { id: 3, name: "Vlad", avatarImg: "imgLink" },
        { id: 4, name: "Vika", avatarImg: "imgLink" },
        { id: 5, name: "Tanya", avatarImg: "imgLink" },
    ],
    /**
     * @property {number | null} selectedDialog
     */
    selectedDialog: null,

    messages: [
        { id: 1, userId: 30, message: "Hi" },
        { id: 2, userId: 2, message: "How are you?" },
        { id: 3, userId: 30, message: "Good" },
        { id: 4, userId: 2, message: "What do you think?" },
    ],
}

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addMessage(state, action) {
            const nextId = state.messages.length + 1
            const userId = action.payload.userId
            const message = action.payload.message

            state.messages.push({
                id: nextId,
                userId: userId,
                message: message
            })
        },
    }
});

export const { addMessage } = dialogsSlice.actions;

export default dialogsSlice.reducer