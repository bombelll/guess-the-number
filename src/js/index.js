// Generate Random Number

const minNumber = 1;
const maxNumber = 101;
const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);

// General Variables

const box = document.getElementById('js-box');
const input = document.getElementById('js-number');
const guessNumberBtn = document.getElementById('js-check-number');
const failedTries = document.getElementById('js-failed-tries');

const modal = document.getElementById('js-modal');
const closeModalBtn = document.getElementById('js-close-modal');

// Code

const css = {
    correct: 'correct',
    incorrect: 'incorrect',
    active: 'active',
}

const addClass = (element, css) => {
    element.classList.add(css);
}

const removeClass = (element, css) => {
    element.classList.remove(css);
}

const isRequired = value => value === '' ? false : true;

let i = 1;

const checkAnswer = () => {

    const inputValue = input.value.trim();
    const error = document.querySelector('small');
    const guessedNumber = +input.value;

    if (!isRequired(inputValue)) {
        error.innerHTML = 'This field cannot be empty';
        return;
    } else {
        error.innerHTML = '';
    }

    if (guessedNumber > 100 || guessedNumber < 1) {
        error.innerHTML = 'Number must be between 1-100';
        return;
    } else {
        error.innerHTML = '';
    }

    if (guessedNumber !== randomNumber) {
        addClass(input, css.incorrect);
        failedTries.innerHTML = `failed tried:&nbsp; ${i++}`;
    } else {
        removeClass(input, css.incorrect);
        addClass(input, css.correct);
        guessNumberBtn.disabled = true;
        guessNumberBtn.style.cursor = 'not-allowed';
        setTimeout(() => {
            addClass(document.body, css.active);
            modal.style.visibility = 'visible';
            box.remove()
        }, 1000);
    }

    input.value = '';
    console.log(guessedNumber, randomNumber);
}

guessNumberBtn.addEventListener('click', () => {
    checkAnswer();
})

input.addEventListener('keyup', e => {
    if (e.key.toLocaleLowerCase() === "enter") {
        checkAnswer();
    }
})

closeModalBtn.addEventListener('click', () => {
    location.reload();
})