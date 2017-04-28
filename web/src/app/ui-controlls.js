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

const hideRunServerStatus = () => {

}

const showErrServerStatus = () => {
  $('#serverDown').removeClass('hide');
  hideAllSuccessMesseges()
}

const hideErrServerStatus = () => {

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

const showPlayerDisconected = () => {

}

const showWinStatus = () => {

}

const showLooseStatus = () => {

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
  return $('#initNumberInput').val();
}

const showPlayerResponce = (number) => {
  $('#nmrReceivedBlock').removeClass('hide');
  $('#nmrReceived').html(number);
}

const hideAllSuccessMesseges = () => {
  $('#waitingForPlayer').addClass('hide');
  $('#serverRun').addClass('hide');
  $('#playerConnected').addClass('hide');
  $('#waitingForPlayer').addClass('hide');
}

export {
  showRunServerStatus,
  hideStartBtn,
  hideRunServerStatus,
  showErrServerStatus,
  hideErrServerStatus,
  showWaitingForPlayer,
  hideWaitingForPlayer,
  showPlayerConnected,
  showPlayerDisconected,
  showWinStatus,
  showLooseStatus,
  showWaitingForPlayerResponce,
  showStartInput,
  showWaitingForFirstPlayerToHit,
  hideWaitingForFirstPlayerToHit,
  getInitNumber,
  hideStartInput,
  showPlayerResponce,
  hideWaitingForPlayerResponce
};
