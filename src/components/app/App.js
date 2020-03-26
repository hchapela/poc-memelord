class AppComponent {
    constructor() {
        this.cache()
        this.init()
    }

    cache() {
        this.socket = io.connect('http://localhost:8080')
        // Get players in the game
        this.playerNumber = getPlayerNumber()
    }

    init() {
        // Setup connection
        this.socket.emit('connection')

        // Set pseudo
        this.setPseudo()

        // Set first player as admin
        if(this.playerNumber.length == 0) {
            this.setFirstAsAdmin()
        }
    }

    // Set new player pseudo on join
    setPseudo() {
        const pseudo = prompt('C\'est quoi ton nom ?')
        this.socket.emit('new_user', pseudo)
    }

    // Gives admin controls to the first player connected
    setFirstAsAdmin() {
        this.socket.on('first_user', () => {
            const adminStart = document.createElement('div')
            adminStart.classList.add('adminStart')
        })
    }

    // Check player list & update
    updatePlayerList() {
        this.socket.on('update_players', (_players) => {
            const playerList = document.querySelector('.playerList')
            playerList.innerHTML = '<ul>' + _players.map((_player) => {
                return '<li>' + _player.pseudo + '</li>';
            }).join('') + '</ul>'
        })
    }

    getPlayerNumber() {
        this.socket.one('player_number', (_number) => { this.playerNumber })
    }
}

export { AppComponent }