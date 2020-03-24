import Player from './Player'

module.exports = class Game {
    constructor(_io) {
        this.started = false
        this.players = []
        this.io = _io
        this.socket = this.io.sockets
    }

    isFirstPlayer() {
        if(!this.started) { this.started = true }
    }

    newPlayer(_pseudo, _isAdmin) {
        let _newPlayer = new Player(this.io, _pseudo, _isAdmin)
        console.log(_newPlayer);
        
        this.players.push(_newPlayer)
        // console.log(this.players);
    }

    updatePlayers() {
        this.socket.emit('update_players', this.players)
    }
}
