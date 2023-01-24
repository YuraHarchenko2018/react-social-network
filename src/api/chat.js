import axios from 'axios'
import { io } from 'socket.io-client'

const getActiveSocketConfig = () => {
  const JwtToken = localStorage.getItem('jwtToken') || ''
  return {
    autoConnect: false,
    auth: {
      jwtToken: JwtToken,
    },
  }
}

const getAxiosInstance = () => {
  const JwtToken = localStorage.getItem('jwtToken') || ''
  return axios.create({
    baseURL: 'http://localhost:9000/',
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${JwtToken}`,
    },
  })
}

export const chatAPI = {

  socket: null,

  createChannel() {
    if (!this.socket) {
      this.socket = io('http://localhost:9000', getActiveSocketConfig())
    }
    this.socket.disconnect()
    this.socket.connect()
    return this.socket
  },

  async handleSendMessage(message, chatId) {
    console.log(`handleSendMessage - ${message}, ${chatId}`)
    this.socket.emit('message', { chatId, text: message })
  },

  async createChat(friendId) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.post('chat/create', { friendId })
    return response.data
  },

  async getDialogs() {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.get('chat/dialogs')
    const dialogsData = response.data
    return dialogsData
  },

  /**
     * @param {number} chatId
     * @param {number} page
     * @param {number} limit
     */
  async getMessages(chatId, page = 1, limit = 30) {
    const axiosInstance = getAxiosInstance()
    const response = await axiosInstance.get(`chat/messages/${chatId}?page=${page}&perPage=${limit}`)
    const messagesData = response.data
    return messagesData
  },

}
