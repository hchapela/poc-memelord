let express = require('express')
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
import Game from './Game'

// Create party
let party = new Game()



// Server
server.listen(8080)

app.use('/public', express.static('public'))

//Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

io.sockets.on('connection', (socket, pseudo) => {

  // new user event
  socket.on('new_user', (pseudo) => {
      socket.pseudo = pseudo
      socket.broadcast.emit('new_user', pseudo)
      // If it's the first player => make him admin
      if(!party.started) {
        socket.emit('first_user')
      }
      party.isFirstPlayer()
  })
})



