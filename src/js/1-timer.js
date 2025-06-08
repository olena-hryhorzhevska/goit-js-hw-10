import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate = null;
let input = document.querySelector('#datetime-picker');
let startBtn = document.querySelector('[data-start]');
let day = document.querySelector('[data-days]');
let hour = document.querySelector('[data-hours]');
let minute = document.querySelector('[data-minutes]');
let second = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    let dateNow = new Date();
    if (userSelectedDate && userSelectedDate < dateNow) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: '#ff4d4d',
        messageColor: '#fff',
        icon: 'material-icons',
        iconText: 'close',
        iconColor: 'rgba(255, 255, 255, 0.4)',
        position: 'topRight',
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      });
      startBtn.disabled = true;
    }
    else {
      startBtn.disabled = false;
    }
  },
};
flatpickr(input, options);

startBtn.addEventListener('click', start);

function start() {
  let intervalId = setInterval(() => {
    input.disabled = true;
    startBtn.disabled = true;
    let dateNow = new Date();
    let delta = userSelectedDate - dateNow;
    let time = convertMs(delta);
    displayOnScreen(time);
    if (delta < 1000) {
      clearInterval(intervalId);
      input.disabled = false;
      startBtn.disabled = false;
    }
  }, -1000);
}

function displayOnScreen({ days, hours, minutes, seconds }) {
  day.textContent = days;
  hour.textContent = hours;
  minute.textContent = minutes;
  second.textContent = seconds;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
