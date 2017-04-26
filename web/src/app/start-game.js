import { request } from 'services';
import { RegisterEventListener } from 'events';

const startGame = () => {
  request({
    method: 'POST',
    url: 'localhost:9999/api/init-player'
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

const startButton = new RegisterEventListener('start-btn', 'click', startGame);
