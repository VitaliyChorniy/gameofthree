import {
    API
} from 'app/config.js';
import {
    request
} from 'app/request.js'
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
    getInitNumber,
    showMoveControllsBlock,
    hideMoveControllsBlock,
    hidePlayerResponce,
    showLooseStatus,
    showWinStatus,
    hidePlayerConnected,
    getMoveValue,
    showRandomBtn
} from 'app/ui-controlls.js';

import {
    isRandomizerEnabled,
    playRandomly
} from 'app/randomizer.js';

const CALL_INTERVAL = 3000;
let waitingForFirstPlayer = false;

function* pollAPI(apiUrl) {
    while (true) { // eslint-disable-line
        yield request({
            url: apiUrl,
            method: 'POST',
            number: Number(sessionStorage.getItem('GOTnumber'))
        });
    }
}

/*
 * Initialize player
 */
const initPlayer = () => {
    initGameAPI();
};

/*
 * Initialize Player, on sucess:
 * - Hide start button
 * - Show server running message
 * - Start pollig Game Start
 * - save player data received from API
 */
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
        }
    }).catch(() => showErrServerStatus());
};

/*
 * Poll api for starting the game
 */
const pollStartGame = () => {
    const poller = pollAPI(API.startGame).next();

    poller.value.then((result) => {
        // if 2nd player is not ready yet
        if (result.waitingForPlayer) {
            showWaitingForPlayer();
            setTimeout(() => pollStartGame(), CALL_INTERVAL);
        }

        // if seconda player is ready
        if (result.secondPlayerReady) {
            hideWaitingForPlayer();
            showPlayerConnected();
            hidePlayerConnected();
            // if current player is the player who starts the game (enter number)
            // else wait for second player to make his hit by polling pollForPlayerResponse
            if (result.playerIdToStart === Number(sessionStorage.getItem('GOTPlayerId'))) {
                showStartInput();
            } else {
                waitingForFirstPlayer = true;
                showWaitingForFirstPlayerToHit();
                hideWaitingForPlayerResponce();
                hideWaitingForPlayer();
                pollForPlayerResponse(true);
            }
        }
    }).catch(() => showErrServerStatus());
};

/*
 * Poll API for player responce
 */
const pollForPlayerResponse = () => {
    const poller = pollAPI(API.playerResponce).next();
    poller.value.then((result) => {
        // 0 means that the player lost
        if (result.playerResponce === 0) {
            hideWaitingForPlayerResponce();
            showLooseStatus();
            hidePlayerResponce();
            return;
        }
        // if no responce number - poll API
        if (!result.playerResponce) {
            if (!waitingForFirstPlayer) {
                showWaitingForPlayerResponce();
            }
            setTimeout(() => pollForPlayerResponse(), CALL_INTERVAL);
        } else {
            // if no number saved, save number received from other user
            // show controlls for current player to make hit
            if (!Number(sessionStorage.getItem('GOTnumber'))) {
                waitingForFirstPlayer = false;
                sessionStorage.setItem('GOTnumber', result.playerResponce);
                hideWaitingForFirstPlayerToHit();
                hideWaitingForPlayerResponce();
                showPlayerResponce(result.playerResponce);
                showMoveControllsBlock();
                showRandomBtn();
                tryRandomPlay(result.playerResponce);
                return;
            }
            // if the number is not changed - wait for change
            if (Number(sessionStorage.getItem('GOTnumber')) === result.playerResponce) {
                showWaitingForPlayerResponce();
                setTimeout(() => pollForPlayerResponse(), CALL_INTERVAL);
                return;
            }

            // if number changed - save it and wait for user action
            // show controlls for current player to make hit
            if (Number(sessionStorage.getItem('GOTnumber')) !== result.playerResponce) {
                sessionStorage.setItem('GOTnumber', result.playerResponce);
                hideWaitingForFirstPlayerToHit();
                hideWaitingForPlayerResponce();
                showPlayerResponce(result.playerResponce);
                showMoveControllsBlock();
                showRandomBtn();
                tryRandomPlay(result.playerResponce);
                return;
            }
        }

    }).catch(() => showErrServerStatus());
};

/*
 * Save user data
 */
const savePlayerData = (data) => {
    sessionStorage.setItem('GOTPlayerId', data.playerId);
};

/*
 * Call API for initializing the game with number from input
 * - on success: hide input, poll for responce
 */
const makeInitialHit = (event) => {
    event.preventDefault();
    const initNumber = getInitNumber();

    sessionStorage.setItem('GOTnumber', initNumber);

    request({
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
};

/*
 * Make  hit
 * @param {object} click event
 */
const makeMove = (event) => {
    const value = getMoveValue(event.target);

    return request({
        url: API.makeHit,
        body: {
            value: value
        },
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST'
    }).then(result => {
        // end game is server send playerWon=true
        if (result.playerWon) {
            hideMoveControllsBlock();
            showWinStatus();
            hidePlayerResponce();
            return;
        }
        sessionStorage.setItem('GOTnumber', result.playerResponce);
        hideMoveControllsBlock();
        pollForPlayerResponse();
    });
};

/*
 * Call server to remove players data
 * Clear sessionStorage
 */
const killSession = () => {
    sessionStorage.removeItem('GOTnumber');
    sessionStorage.removeItem('GOTPlayerId');

    return request({
        url: API.killSession,
        body: {
            userId: sessionStorage.getItem('GOTPlayerId')
        },
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST'
    });
};

/*
 * If user enabled rnadom play - play randomly
 */
const tryRandomPlay = playerResponce => {
    if (isRandomizerEnabled()) {
        showPlayerResponce(playerResponce);
        playRandomly();
    }
}

export {
    initPlayer,
    makeMove,
    makeInitialHit,
    killSession
}
