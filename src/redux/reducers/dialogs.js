import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { chatAPI } from "api/chat";
import { getSelectedDialogSelector } from "redux/selectors/dialogs";
import { fetchFriends } from "./users";

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
     * Object for unreaded messages (Now working only in online mode [websocket])
     * Where key is a chatId
     * And value is the amount of unreaded messages
     */
    unreadedMessages: {},

    /**
     * @property {number | null} selectedDialog
     */
    selectedDialog: null,

    /**
     * @property {[
     *   {
     *     id: number,
     *     senderId: number,
     *     text: string,
     *   }, 
     *   ...
     * ] | []} messages
     */
    messages: [],
}

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addMessage(state, action) {
            const { id, senderId, text } = action.payload
            state.messages.push({ id, senderId, text })
        },
        addUnreadedMessage(state, action) {
            const chatId = action.payload
            const unreadedAmout = state.unreadedMessages[chatId] ?? 0
            state.unreadedMessages[chatId] = unreadedAmout + 1
        },
        nullifyUnreadedMessagesValueForChat(state, action) {
            const chatId = action.payload
            state.unreadedMessages[chatId] = 0
        },
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
    addUnreadedMessage,
    nullifyUnreadedMessagesValueForChat,
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

export const createChat = createAsyncThunk(
    'dialogs/createChat',
    /**
     * @param {number} friendId
     */
    async (friendId, { dispatch }) => {
        const resultData = await chatAPI.createChat(friendId)

        if (resultData.status) {
            const chatId = resultData.chatId

            dispatch(setSelectedDialog(chatId))
            dispatch(fetchDialogs())
            dispatch(setMessages([]))
            dispatch(fetchFriends({ selectedPage: 1, perPage: 100 })) // ??? add mark to select all

            dispatch(stopListeningMessage())
            dispatch(startListeningMessage())
        }
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
    async (data, { dispatch, getState }) => {
        if (!_messageHandler) {
            _messageHandler = ({ id, text, senderId, created_at, updated_at, chat }) => {
                console.log('startListeningMessage: ', created_at, updated_at)
                console.log({ id, senderId, text, chat })

                const selectedDialog = getSelectedDialogSelector(getState())

                // !!! add preview on dialogs if chatId is not the selectedDialog
                if (chat.id === selectedDialog) {
                    dispatch(addMessage({ id, senderId, text }))
                } else {
                    dispatch(addUnreadedMessage(chat.id))
                }
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