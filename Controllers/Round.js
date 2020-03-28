module.exports = class Round {
    constructor(_players) {
        this.init()
    }

    init() {
        this.players = _players
        this.images = getAllImages()
    }

    // Start new round
    startRound() {

    }

    // Put all images in an array
    getAllImages() {

    }

    // Get choosen image from the server and download it
    getImage() {
        // axios({
        //     method: 'get',
        //     url: 'http://alphonsebouy.fr/meme-friends/52602875_2421778081229805_4997327579997274112_n.png',
        //     responseType: 'stream'
        //   })
        //     .then(function (response) {
        //       response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        //   })
        //     .then(console.log('hey'))
    }

    sendImage() {

    }

    getVotes() {

    }

    // Pick random image from array
    pickImage(_images) {
        return _images[Math.floor(Math.random() * _images.length)]
    }


}