const io = require("socket.io")(3000, {
    cors: {
      origin: "*",
    },
  });
  

io.on('connection', socket => {
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message)
    })
})