/* global $ */

const HIDE_MSG_SEC = 5000;

const showRunServerStatus = () => {
    $('#serverRun').removeClass('hide');
    setTimeout(() => {
        $('#serverRun').addClass('hide');
    }, HIDE_MSG_SEC);
}

const hideStartBtn = () => {
    $('#startBtn').addClass('hide');
}

const showErrServerStatus = () => {
    $('#serverDown').removeClass('hide');
    hideAllSuccessMesseges()
}

const hideErrServerStatus = () => {
    $('#serverDown').addClass('hide');
}

const showWaitingForPlayer = () => {
    $('#waitingForPlayer').removeClass('hide');
}

const hideWaitingForPlayer = () => {
    $('#waitingForPlayer').addClass('hide');
}

const showPlayerConnected = () => {
    $('#playerConnected').removeClass('hide');
}

const hidePlayerConnected = () => {
    setTimeout(() => {
        $('#playerConnected').addClass('hide');
    }, HIDE_MSG_SEC);
}

const showWinStatus = () => {
    $('#youWon').removeClass('hide');
}

const showLooseStatus = () => {
    $('#youLost').removeClass('hide');
}

const showWaitingForPlayerResponce = () => {
    $('#waitingForPlayerResponce').removeClass('hide');
}

const hideWaitingForPlayerResponce = () => {
    $('#waitingForPlayerResponce').addClass('hide');
}

const showStartInput = () => {
    $('#startInput').removeClass('hide');
}

const hideStartInput = () => {
    $('#startInput').addClass('hide');
}
const showWaitingForFirstPlayerToHit = () => {
    $('#waitingForFirstPlayerToHit').removeClass('hide');
}

const hideWaitingForFirstPlayerToHit = () => {
    $('#waitingForFirstPlayerToHit').addClass('hide');
}

const getInitNumber = () => {
    return Number($('#initNumberInput').val());
}

const showPlayerResponce = (number) => {
    $('#nmrReceivedBlock').removeClass('hide');
    $('#nmrReceived').html(number);
}

const hidePlayerResponce = () => {
    $('#nmrReceivedBlock').addClass('hide');

}

const hideAllSuccessMesseges = () => {
    $('#waitingForPlayer').addClass('hide');
    $('#serverRun').addClass('hide');
    $('#playerConnected').addClass('hide');
    $('#waitingForPlayer').addClass('hide');
}

const showMoveControllsBlock = () => {
    $('#moveControllsBlock').removeClass('hide');
}

const hideMoveControllsBlock = () => {
    $('#moveControllsBlock').addClass('hide');
}

const getMoveValue = element => {
    return $(element).attr('value')
}

const hideRandomBtn = () => {
    $('#startRandom').addClass('hide');
}

const showRandomBtn = () => {
    $('#startRandom').removeClass('hide');
}

const disableMoveButtons = () => {
    $('#btnMinusOne').addClass('disabled');
    $('#btnZero').addClass('disabled');
    $('#btnPlusOne').addClass('disabled');
}

const triggerClickById = id => {
    $(`#${id}`).trigger('click');
}

export {
    showRunServerStatus,
    hideStartBtn,
    showErrServerStatus,
    hideErrServerStatus,
    showWaitingForPlayer,
    hideWaitingForPlayer,
    showPlayerConnected,
    hidePlayerConnected,
    showWinStatus,
    showLooseStatus,
    showWaitingForPlayerResponce,
    showStartInput,
    showWaitingForFirstPlayerToHit,
    hideWaitingForFirstPlayerToHit,
    getInitNumber,
    hideStartInput,
    showPlayerResponce,
    hidePlayerResponce,
    hideWaitingForPlayerResponce,
    showMoveControllsBlock,
    hideMoveControllsBlock,
    getMoveValue,
    disableMoveButtons,
    triggerClickById,
    hideRandomBtn,
    showRandomBtn
};
