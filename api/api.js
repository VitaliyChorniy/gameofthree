/* global module */

let players = [];
let id = 0;
let waitingForPlayer = true;
let secondPlayerReady = false;
let gameData = {
    number: null
};

module.exports = (express) => {
    const api = express.Router();

    // initalize player data and save to players array
    api.post('/init-player', (req, res) => {
        let isFirstPlayer = false;
        ++id;
        if (id === 1) {
            isFirstPlayer = true;
        }

        players.push({
            id: id,
            isFirstPlayer: isFirstPlayer
        });

        res.status(200).send({
            playerId: id,
            isFirstPlayer: isFirstPlayer,
            connected: true
        });
    });

    api.post('/start-game', (req, res) => {
        const isFirstPlayer = players.find(player => !!player.isFirstPlayer);

        if (players.length > 1) {
            waitingForPlayer = false;
            secondPlayerReady = true;
        }

        res.status(200).send({
            playerIdToStart: isFirstPlayer ? isFirstPlayer.id : null,
            waitingForPlayer: waitingForPlayer,
            secondPlayerReady: secondPlayerReady,
            connected: true,
        });
    });

    api.post('/init-game-num', (req, res) => {
        gameData.number = req.body.initNumber;

        res.status(200).send({
            number: req.body.initNumber,
            connected: true
        });
    });

    api.post('/end-session', (req, res) => {
        players = [];

        res.status(200).send({
            success: true
        });
    });

    api.post('/player-responce', (req, res) => {
        res.status(200).send({
            playerResponce: gameData.number,
            success: true
        });
    });

    api.post('/make-hit', function (req, res) {
        const actionNumber = req.body.value;
        let playerWon = false;

        gameData.number = Math.round((Number(gameData.number) + Number(actionNumber)) / 3);

        // if result is 1 - it means that the player has webkit-animation
        // - sent the player win status
        // - save 0 under number, which will mean for the other player that he/she lost
        if (gameData.number === 1) {
            playerWon = true;
            gameData.number = 0;
        }
        res.status(200).send({
            playerResponce: gameData.number,
            success: true,
            playerWon: playerWon
        });
    });


    return api;
}
