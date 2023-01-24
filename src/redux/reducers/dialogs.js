/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { chatAPI } from '../../api/chat'
import { getSelectedDialogSelector } from '../selectors/dialogs'
import { fetchFriends } from './users'

const initialState = {
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
     * Object for unread messages (Now working only in online mode [websocket])
     * Where key is a chatId
     * And value is the amount of unread messages
     */
  unreadMessages: {},

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
      state.messages = [{ id, senderId, text }, ...state.messages]
    },
    addUnreadMessage(state, action) {
      const chatId = action.payload
      const unreadAmount = state.unreadMessages[chatId] ?? 0
      state.unreadMessages[chatId] = unreadAmount + 1
    },
    nullifyUnreadMessagesValueForChat(state, action) {
      const chatId = action.payload
      state.unreadMessages[chatId] = 0
    },
    setMessages(state, action) {
      state.messages = action.payload
    },
    addMessagesToExists(state, action) {
      state.messages = [...state.messages, ...action.payload]
    },
    setDialogs(state, action) {
      state.dialogs = action.payload
    },
    setSelectedDialog(state, action) {
      const chatId = action.payload
      state.selectedDialog = chatId
    },
  },
})

export const {
  addMessage,
  addUnreadMessage,
  nullifyUnreadMessagesValueForChat,
  setMessages,
  addMessagesToExists,
  setDialogs,
  setSelectedDialog,
} = dialogsSlice.actions

// eslint-disable-next-line no-underscore-dangle
let _messageHandler = null

export const startListeningMessage = createAsyncThunk(
  'dialogs/startListeningMessage',
  async (data, { dispatch, getState }) => {
    if (!_messageHandler) {
      _messageHandler = ({
        id, text, senderId, chat,
      }) => {
        const selectedDialog = getSelectedDialogSelector(getState())

        if (chat.id === selectedDialog) {
          dispatch(addMessage({ id, senderId, text }))
        } else {
          dispatch(addUnreadMessage(chat.id))
        }
      }
    }

    const socket = chatAPI.createChannel()
    socket.on('message', _messageHandler)
  },
)

export const stopListeningMessage = createAsyncThunk('dialogs/stopListeningMessage', () => {
  if (_messageHandler) {
    const socket = chatAPI.createChannel()
    socket.off('message', _messageHandler)
  }
})

export const fetchDialogs = createAsyncThunk(
  'dialogs/fetchDialogs',
  async (data, { dispatch }) => {
    const dialogs = await chatAPI.getDialogs()
    dispatch(setDialogs(dialogs))
  },
)

export const createChat = createAsyncThunk(
  'dialogs/createChat',
  /**
   * @param {number} friendId
   */
  async (friendId, { dispatch }) => {
    const resultData = await chatAPI.createChat(friendId)

    if (resultData.status) {
      const { chatId } = resultData

      dispatch(setSelectedDialog(chatId))
      dispatch(fetchDialogs())
      dispatch(setMessages([]))
      dispatch(fetchFriends({ selectedPage: 1, perPage: 100 })) // ??? add mark to select all

      dispatch(stopListeningMessage())
      dispatch(startListeningMessage())
    }
  },
)

export const fetchMessages = createAsyncThunk(
  'dialogs/fetchMessages',
  /**
   * @param {object} data
   */
  async (data, { dispatch }) => { // getState
    const { chatId } = data
    const { page } = data
    const { limit } = data

    // const selectedDialog = getSelectedDialogSelector(getState())

    const messages = await chatAPI.getMessages(chatId, page, limit)

    // if (chatId === selectedDialog) {
    dispatch(addMessagesToExists(messages))
    // } else {
    //     dispatch(setMessages(messages))
    // }
  },
)

export default dialogsSlice.reducer
