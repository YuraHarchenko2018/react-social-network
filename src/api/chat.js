import { addMessage } from "redux/reducers/dialogs";
import { io } from "socket.io-client";

const getActiveSocketConfig = () => {
    let JwtToken = localStorage.getItem('jwtToken') || ''
    return {
        autoConnect: false,
        auth: {
            jwtToken: JwtToken
        }
    }
}

const subscribers = [];
let socket = io('http://localhost:9000', getActiveSocketConfig());
// let reconnInterval;

socket.on("connect", () => {
    // reconnInterval && clearInterval(reconnInterval)
    console.log('connect')
});

socket.on("disconnect", () => {
    console.log('disconnected')
    socket.connect()
});

socket.on("connect_error", (error) => {
    console.log('connect_error')
    console.log(error)
    // reconnInterval = setInterval(() => {
    //     console.log('timeout 3000')
    //     socket = io('http://localhost:9000', getActiveSocketConfig());
    //     socket.connect()
    // }, 3000)
});

const createChannel = () => {
    socket = io('http://localhost:9000', getActiveSocketConfig());
    socket.connect()
}
createChannel()

const messageHandler = dispatch => ({ senderId, senderName, text }) => {
    dispatch(addMessage({ message: text, userId: senderId }))
    console.log(senderName)
}

export const chatAPI = {

    subscribe(callback) {
        subscribers.push(callback)
    },

    async listenOnMessage(dispatch) {
        socket.on('message', messageHandler(dispatch))
    },

    async handleSendMessage(message) {
        socket.emit('message', { text: message })
    }

}