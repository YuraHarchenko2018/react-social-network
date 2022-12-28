import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { chatAPI } from "api/chat";

let initialState = {
    /**
     * @property {[
     *   {
     *     id: number,
     *     name: string,
     *     avatarImg: string,
     *   }, 
     *   ...
     * ] | []} dialogs
     */
    dialogs: [],
    /**
     * @property {number | null} selectedDialog
     */
    selectedDialog: null,

    messages: [
        { id: 1, senderId: 30, text: "Hi" },
        { id: 2, senderId: 2, text: "How are you?" },
        { id: 3, senderId: 30, text: "Good" },
        { id: 4, senderId: 2, text: "What do you think?" },
    ],
}

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addMessage(state, action) {
            const { id, senderId, text } = action.payload
            state.messages.push({ id, senderId, text })
        },
        // messagesReceived
        setMessages(state, action) {
            state.messages = action.payload
        },
        setDialogs(state, action) {
            state.dialogs = action.payload
        },
        setSelectedDialog(state, action) {
            const chatId = action.payload
            state.selectedDialog = chatId
        }
    }
});

export const {
    addMessage,
    setMessages,
    setDialogs,
    setSelectedDialog,
} = dialogsSlice.actions;

export const fetchDialogs = createAsyncThunk(
    'dialogs/fetchDialogs',
    async (data, { dispatch }) => {
        const dialogs = await chatAPI.getDialogs()
        dispatch(setDialogs(dialogs))
    }
)

export const fetchMessages = createAsyncThunk(
    'dialogs/fetchMessages',
    /**
     * @param {number} chatId
     */
    async (chatId, { dispatch }) => {
        const messages = await chatAPI.getMessages(chatId)
        dispatch(setMessages(messages))
    }
)


let _messageHandler = null

export const startListeningMessage = createAsyncThunk(
    'dialogs/startListeningMessage',
    async (data, { dispatch }) => {
        if (!_messageHandler) {
            _messageHandler = ({ id, text, senderId, created_at, updated_at }) => {
                console.log('startListeningMessage: ', created_at, updated_at)
                console.log({ id, senderId, text })
                dispatch(addMessage({ id, senderId, text }))
            }
        }

        const socket = chatAPI.createChannel()
        socket.on('message', _messageHandler)
    }
)

export const stopListeningMessage = createAsyncThunk(
    'dialogs/stopListeningMessage', () => {
        if (_messageHandler) {
            const socket = chatAPI.createChannel()
            socket.off('message', _messageHandler)
        }
    }
)

export default dialogsSlice.reducer