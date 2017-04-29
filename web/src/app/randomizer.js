import {
    hideRandomBtn,
    disableMoveButtons,
    triggerClickById
} from 'app/ui-controlls.js';

const btnIds = ['btnMinusOne', 'btnZero', 'btnPlusOne'];
let randomizerEnabled = false;

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const isRandomizerEnabled = () => {
    return randomizerEnabled;
}

const playRandomly = () => {
    hideRandomBtn();
    disableMoveButtons();
    randomizerEnabled = true;
    triggerClickById(btnIds[getRandomInt(0, btnIds.length)]);
}

export {
    playRandomly,
    isRandomizerEnabled
}
