const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
import fs from 'fs'
import axios from 'axios'
import http from 'http'

http.get('http://alphonsebouy.fr/meme-friends', (_res) => {
  const { statusCode } = _res
  console.log(_res);
  
})



fs.readdirSync('./src/').forEach(file => {
  console.log(file);
});



axios({
  method: 'get',
  url: 'http://alphonsebouy.fr/meme-friends/',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('test.html'))
  });


import Game from './Controllers/Game'

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
      // Send players number
      socket.emit('player_number', party.players.length())

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



