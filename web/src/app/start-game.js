import { request } from 'app/services.js';
import { RegisterEventListener } from 'app/events.js';

const startGame = () => {
  request({
    method: 'POST',
    url: 'http://127.0.0.1:9999/api/init-player'
  }).then(data => {
      const response = JSON.parse(data);
      if (response.status = 'success') {
        document.getElementById('status').innerHTML = 'Active';
        localStorage.setItem('token', response.token);
      } else {
        document.getElementById('status').innerHTML = 'Smth went wrong';
      }

  }).catch(error => {
      console.log(error);
  });
}

const start = () => {
  new RegisterEventListener('start-btn', 'click', startGame);
}

export { start }
