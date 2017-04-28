import { API } from 'app/config.js';
import { fetch } from 'app/request.js'
import {
  showRunServerStatus,
  showWaitingForPlayer,
  showPlayerConnected,
  hideStartBtn,
  hideWaitingForPlayer,
  showErrServerStatus,
  showWaitingForPlayerResponce,
  hideWaitingForPlayerResponce,
  showPlayerResponce,
  showStartInput,
  showWaitingForFirstPlayerToHit
} from 'app/ui-controlls.js';

function *pollAPI(apiUrl){
  while(true){
    yield fetch ({
        url: apiUrl,
        method: 'POST'
      });
  }
}

const pollForPlayerResponse = () => {
  const poller = pollAPI(API.playerResponce).next();
  poller.value.then((result) => {
    if(result.waitingForPlayerResponce) {
      showWaitingForPlayerResponce();
      setTimeout(() => pollForPlayerResponse(), 3000);
    }

    if(result.playerResponce) {
      hideWaitingForPlayerResponce();
      showPlayerResponce();
    }
    console.log(result);
  }).catch(() => {
    showErrServerStatus();
  });
};

const pollStartGame = () => {
  const poller = pollAPI(API.startGame).next();
  poller.value.then((result) => {
    if(result.waitingForPlayer) {
      showWaitingForPlayer();
      setTimeout(() => pollStartGame(), 3000);
    }

    if(result.secondPlayerReady) {
      hideWaitingForPlayer();
      showPlayerConnected();
      if(result.playerIdToStart === Number(sessionStorage.getItem('gofPlayerId'))) {
        showStartInput()
      } else {
        showWaitingForFirstPlayerToHit();
      }
      setTimeout(() => pollStartGame(), 3000);
    }
    console.log(result);
  }).catch(() => {
    showErrServerStatus();
  });
};

const initGameAPI = () => {
  fetch({
    url: API.initPlayer,
    method: 'POST'
  }).then((result) => {
    if (result.connected) {
      hideStartBtn();
      showRunServerStatus();
      pollStartGame();
      savePlayerData(result);
    }
  }).catch(() => {
    showErrServerStatus();
  });
}

const savePlayerData = (data) => {
  sessionStorage.setItem('gofPlayerId', data.playerId);
  sessionStorage.setItem('gofPlayerToken', data.token);
}

const initPlayer = () => {
  initGameAPI();
}

const makeInitialHit = (event) => {
  event.preventDefault();
  console.log($('#initNumberInput').val())
}

const makeMoveMinusOne = () => {
  console.log('makeMoveMinusOne player');
}

const makeMoveZero = () => {
  console.log('makeMoveZero player');
}

const makeMovePlusOne = () => {
  console.log('makeMovePlusOne player');
}

export {
  initPlayer,
  makeMoveMinusOne,
  makeMoveZero,
  makeMovePlusOne,
  makeInitialHit
}



















//
// export { request };
