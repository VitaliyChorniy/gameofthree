import {
    initPlayer,
    makeMove,
    makeInitialHit,
    killSession
} from 'app/api-connector.js';
import {
    RegisterEventListener,
    RegisterKillSessionListener
} from 'app/events.js';

const initEventListeners = () => {
    new RegisterEventListener('startBtn', 'click', initPlayer);
    new RegisterEventListener('btnMinusOne', 'click', makeMove);
    new RegisterEventListener('btnZero', 'click', makeMove);
    new RegisterEventListener('btnPlusOne', 'click', makeMove);
    new RegisterEventListener('initNumberForm', 'submit', makeInitialHit);
    RegisterKillSessionListener(killSession);
}

const start = () => {
    killSession();
    initEventListeners();
}

export {
    start
}
