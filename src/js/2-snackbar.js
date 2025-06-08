import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  let delay = document.querySelector('input[name="delay"]').value;
  let state = document.querySelector('input[name="state"]:checked').value;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })
    .then(result => {
      iziToast.show({
        message: result,
        backgroundColor: 'rgba(0, 128, 0, 0.7)',
        messageColor: '#fff',
        position: 'topRight',
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      });
    })
    .catch(err => {
      iziToast.show({
        message: err,
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        messageColor: '#fff',
        position: 'topRight',
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      });
    });
}
