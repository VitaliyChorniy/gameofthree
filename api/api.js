const path = require('path');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
let players = [];
let id = 0;
let waitingForPlayer = true;
let secondPlayerReady = false;
let gameData = {
  number: null
};

module.exports = (express) => {
    const api = express.Router();

    api.post('/init-player',  (req, res) => {
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

    api.post('/start-game',  (req, res) => {
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
      const id = req.body.userId;
      const playerIndex = players.findIndex(player => !!player.id === id).id;

      players.splice(playerIndex, 1);

      res.status(200).send({
          success: true
      });
    });

    api.post('/player-responce', (req, res) => {
      res.status(200).send({
          divisionResult: (gameData.number / 3),
          playerResponce: gameData.number || null,
          success: true
      });
    });

    api.post('/make-hit', function (req, res) {
      // TODO receive number divide it by 3 check if result is 1
      // if 1 - send player win result another player loose result
      // if > 1 send second player the number
      const actionNumber = req.body.value;

      gameData.number = gameData.number + actionNumber;

      res.status(200).send({
          divisionResult: (gameData.number / 3),
          playerResponce: gameData.number || null,
          success: true
      });
    });


    return api;
}
