let express = require('express')
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
import Game from './Game'

// Create party
let party = new Game(io)



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

      // If it's the first player => make him admin and create user
      if(!party.started) {
        socket.emit('first_user')
        party.newPlayer(pseudo, true)
      }
      else {
        party.newPlayer(pseudo, false)
      }
      // Update players list
      party.updatePlayers()
      // Check if first user
      party.isFirstPlayer()
  });

  // If user disconnect, delete player
  socket.on('disconnect', (_player) => {
    party.players.splice( party.players.indexOf(socket.pseudo), 1 )
    party.updatePlayers()
  });


  // socket.on('game_start'), () => {
  //   console.log('GAME HAS STARTED');
  // }
})



