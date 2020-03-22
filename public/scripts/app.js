const socket = io.connect('http://localhost:8080')

socket.emit('connection')

// Send new player pseudp
const pseudo = prompt('C\'est quoi ton nom ?')
socket.emit('new_user', pseudo)


// Announce new player arrived

socket.on('first_user', () => {
   console.log('first user');
})

socket.on('new_user', (pseudo) => {
   console.log(`${pseudo} has joined the game`)
})
