const socket = io.connect('http://localhost:8080')

// New client
const pseudo = prompt('C\'est quoi ton nom ?')
socket.emit('new_user', pseudo)