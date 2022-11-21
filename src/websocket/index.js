const socket = io("http://localhost:9000")

const message = document.querySelector('#message')
const messages = document.querySelector('#messages')

const handleSubmitNewMessage = () => {
    socket.emit('message', {
        text: message.value
    })
}

socket.on('message', (body) => {
    handleNewMessage(body.text)
})

const handleNewMessage = (message) => {
    messages.appendChild(buildNewMessage(message))
}
const buildNewMessage = (message) => {
    const li = document.createElement('li')
    li.append(message)
    return li
}