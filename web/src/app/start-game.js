import { initPlayer, makeMoveMinusOne, makeMoveZero, makeMovePlusOne, makeInitialHit } from 'app/api-connector.js';
import { RegisterEventListener } from 'app/events.js';

const initEventListeners = () => {
  new RegisterEventListener('startBtn', 'click', initPlayer);
  new RegisterEventListener('btnMinusOne', 'click', makeMoveMinusOne);
  new RegisterEventListener('btnZero', 'click', makeMoveZero);
  new RegisterEventListener('btnPlusOne', 'click', makeMovePlusOne);
  new RegisterEventListener('initNumberForm', 'submit', makeInitialHit);
}

const start = () => {
  initEventListeners();
}

export { start }
