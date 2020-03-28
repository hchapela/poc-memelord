import Player from './Player'
import Round from './Round'

module.exports = class Game {
    constructor(_io) {
        this.io = _io
        this.socket = this.io.sockets

        
        // Init game party
        this.init()
    }

    init() {
        this.players = []
        this.timerRound = 30000
    }

    newPlayer(_pseudo, _isAdmin) {
        let _newPlayer = new Player(_pseudo, _isAdmin)
        this.players.push(_newPlayer)
    }

    updatePlayers() {
        this.socket.emit('update_players', this.players)
    }

    // Start Timer
    sendTimer() {
        this.socket.emit('timer_start', this.timerRound)
        setTimeout(() => {
            this.sendEndTimer()
        }, this.timerRound);
    }

    // Stop Timer
    sendEndTimer() {
        this.socket.emit('timer_stop')
    }
}
