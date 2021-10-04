const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('chat-message-list')
const messageForm = document.getElementById('chat-form')
const messageInput = document.getElementById('message-input')

socket.on('chat-message', data => {
    appendMessageReceiver(data)
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessageSender(message)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessageReceiver(message) {

    time = new Date()
    hour = time.getHours()
    currentTime = "0"

    if (hour > 12){
        hour = hour - 12
        currentTime = hour + ":" + time.getMinutes() + " PM" }
    else
        currentTime = hour + ":" + time.getMinutes() + " AM"

    messageTime = document.createElement("div",{"class":"message-time"}, currentTime)
    messageText = document.createElement("div",{"class":"message-text"}, message)
    newMessage = document.createElement("div")
    messageText.innerText = message
    messageTime.innerText = currentTime
    newMessage.className = "message-row other-message"
    messageText.className = "message-text"
    messageTime.className = "message-time"

    messageContainer.prepend(newMessage)
    newMessage.append(messageText)
    newMessage.append(messageTime)
}

function appendMessageSender(message) {

    time = new Date()
    hour = time.getHours()
    currentTime = "0"

    if (hour > 12){
        hour = hour - 12
        currentTime = hour + ":" + time.getMinutes() + " PM" }
    else
        currentTime = hour + ":" + time.getMinutes() + " AM"

    messageTime = document.createElement("div",{"class":"message-time"}, currentTime)
    messageText = document.createElement("div",{"class":"message-text"}, message)
    newMessage = document.createElement("div")
    messageText.innerText = message
    messageTime.innerText = currentTime
    newMessage.className = "message-row you-message"
    messageText.className = "message-text"
    messageTime.className = "message-time"

    messageContainer.prepend(newMessage)
    newMessage.append(messageText)
    newMessage.append(messageTime)
}