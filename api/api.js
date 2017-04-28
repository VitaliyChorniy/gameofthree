const path = require('path');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const players = [];
let id = 0;
let waitingForPlayer = true;
let secondPlayerReady = false;

const  createToken = (req) => {
    const token = jsonwebtoken.sign({
    }, 'secretKey', {
        expiresIn: '1h'
    });

    return token;
}

module.exports = (express) => {
    const api = express.Router();

    api.post('/init-player',  (req, res) => {
      const token = createToken(req);
      let firstPlayer = false;
      ++id;
      if (id === 1) {
        firstPlayer = true;
      }

      players.push({
        id: id,
        token: token,
        firstPlayer: firstPlayer
      });

      res.status(200).send({
          playerId: id,
          firstPlayer: firstPlayer,
          connected: true,
          token: token
      });
    });

    api.post('/start-game',  (req, res) => {
      if (players.length > 1) {
        waitingForPlayer = false;
        secondPlayerReady = true;
      }

      res.status(200).send({
          playerIdToStart: players.find(player => !!player.firstPlayer).id,
          waitingForPlayer: waitingForPlayer,
          secondPlayerReady: secondPlayerReady,
          connected: true,
      });
    });

    api.post('/init-game-num', (req, res) => {

      res.status(200).send({
          connected: true,
      });
    })

    // Middleware to verify token
    api.use((req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jsonwebtoken.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    res.status(403).send({
                        success: false,
                        message: "Failed to authrntificate user"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({
                success: false,
                message: "No Token Provided"
            });
        }
    });

    api.post('/make-stroke', function (req, res) {
      // TODO receive number divide it by 3 check if result is 1
      // if 1 - send player win result another player loose result
      // if > 1 send second player the number
    });

    return api;
}
