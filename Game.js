module.exports = class Game {
    constructor() {
        console.log('hey');
        this.started = false
    }

    isFirstPlayer() {
        if(!this.started) { this.started = true }
    }

    test() {
        console.log("yo");
    }
}
