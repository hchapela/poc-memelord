var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.use('/public', express.static('public'));

//Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.sockets.on('connection', (socket, pseudo) => {
  // new user event
  socket.on('new_user', (pseudo) => {
      socket.pseudo = pseudo;
      socket.broadcast.emit('new_user', pseudo);
  });

});

