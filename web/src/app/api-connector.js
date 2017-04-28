import { API } from 'app/config.js';
import { request } from 'app/request.js'
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
  hideStartInput,
  showWaitingForFirstPlayerToHit,
  hideWaitingForFirstPlayerToHit,
  getInitNumber
} from 'app/ui-controlls.js';

function *pollAPI(apiUrl){
  while(true){
    yield request ({
        url: apiUrl,
        method: 'POST'
      });
  }
}

const pollForPlayerResponse = () => {
  const poller = pollAPI(API.playerResponce).next();
  poller.value.then((result) => {
    if(!result.playerResponce) {
      setTimeout(() => pollForPlayerResponse(), 3000);
    }

    if(result.playerResponce  && result.playerResponce !== sessionStorage.getItem('gofInitNumber')) {
      hideWaitingForFirstPlayerToHit();
      hideWaitingForPlayerResponce();
      showPlayerResponce(result.playerResponce);
    } else if (result.playerResponce){
      showWaitingForPlayerResponce();
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
        showStartInput();
      } else {
        showWaitingForFirstPlayerToHit();
        hideWaitingForPlayer();
        pollForPlayerResponse();
      }
    }
    console.log(result);
  }).catch(() => {
    debugger;
    showErrServerStatus();
  });
};

const initGameAPI = () => {
  request({
    url: API.initPlayer,
    method: 'POST'
  }).then((result) => {
    if (result.connected) {
      hideStartBtn();
      showRunServerStatus();
      pollStartGame();
      savePlayerData(result);
      registerSessionWatchers();
    }
  }).catch(() => {
    showErrServerStatus();
  });
}

const savePlayerData = (data) => {
  sessionStorage.setItem('gofPlayerId', data.playerId);
}

const initPlayer = () => {
  initGameAPI();
}

const makeInitialHit = (event) => {
  event.preventDefault();
  const initNumber = getInitNumber();
  sessionStorage.setItem('gofInitNumber', initNumber);

  request ({
      url: API.initGameNumber,
      body: {
        initNumber: initNumber
      },
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST'
    }).then(() => {
      hideStartInput();
      pollForPlayerResponse();
    });
}

const makeMove = (element) => {
  const value = $(element.target).attr('value');

  return request ({
      url: API.killSession,
      body: {
        value: value
      },
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST'
    }).then(() => pollForPlayerResponse())
}

const killSession = () => {
  return request ({
      url: API.killSession,
      body: {
        userId: sessionStorage.getItem('gofPlayerId')
      },
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST'
    });
}
const registerSessionWatchers = () => {

}

export {
  initPlayer,
  makeMove,
  makeInitialHit,
  killSession
}



















//
// export { request };
