const socket = io.connect('http://localhost:8080')

socket.emit('connection')

// Send new player pseudp
const pseudo = prompt('C\'est quoi ton nom ?')
socket.emit('new_user', pseudo)


// Announce new player arrived
socket.on('new_user', (pseudo) => {
   console.log(`${pseudo} has joined the game`)
}); 

// If new user, give admin controls
socket.on('first_user', () => {
    console.log('first user')
})

// Update player list
socket.on('update_players', (_players) => {
    const playerList = document.querySelector('.playerList')
    playerList.innerHTML = '<ul>' + _players.map((_player) => {
        return '<li>' + _player.pseudo + '</li>';
    }).join('') + '</ul>'
})


// addEventListener('click', () => {
//     socket.emit('game_start')
// })

