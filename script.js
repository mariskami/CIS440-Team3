const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('chat-message-list')
const messageForm = document.getElementById('chat-form')
const messageInput = document.getElementById('message-input')

socket.on('chat-message', data => {
    appendMessage(data)
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    messageTime = document.createElement("div",{"class":"message-time"},"2:15 PM"),
    messageText = document.createElement("div",{"class":"message-text"},""),
    newMessage = document.createElement("div",{"class":"message-row you-message"},[messageText,messageTime]);
    messageText.innerText = message
    messageTime.innerText = "5:15 PM"
    messageContainer.append(newMessage)
}