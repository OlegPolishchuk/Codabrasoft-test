import '../index.html';
import '../styles/index.css';

import {validation, clearErrorMessage} from './validation';

const form = document.forms.loginForm;
const inputs = form.querySelectorAll('input');

const nameInput = form.elements.name;
const lastNameInput = form.elements.lastName;
const dateOfBirthInput = form.elements.dateOfBirth;
const emailInput = form.elements.email;
const passwordInput = form.elements.password;
const confirmPasswordInput = form.elements.confirmPassword;
const buttonSend = document.getElementById('sendBtn');

const {
  validateRequired,
  validateLength,
  validateDate,
  validateEmail,
  validatePassword,
  confirmPasswords,
} = validation;

buttonSend.addEventListener('click', sendData);

for (let input of inputs) {
  input.addEventListener('focus', handleInputFocus);
}

function sendData(event) {
  event.preventDefault();

  console.log('click')
  if (!form.valid) {
  }

  const validatedInputs = [
    validateLength(nameInput),
    validateLength(lastNameInput),
    validateDate(dateOfBirthInput),
    validateEmail(emailInput),
    validatePassword(passwordInput),
    validateRequired(inputs),
    confirmPasswords(passwordInput, confirmPasswordInput)
  ]

  const isFormValid = validatedInputs.every(validated => validated);

  if (isFormValid) {
    clearAllErrorMessages(inputs);
    setSuccessClassName(form);

    console.log('all inputs are valid')
  }

  console.log(`validatedInputs =>`, validatedInputs)
  console.log('isFormValid => ', isFormValid)
}


function handleInputFocus(event) {
  clearErrorMessage(event.target);
}

function clearAllErrorMessages(inputs) {
  for (let input of inputs) {
    clearErrorMessage(input);
  }
}

function setSuccessClassName(element) {
  element.classList.add('success');
}