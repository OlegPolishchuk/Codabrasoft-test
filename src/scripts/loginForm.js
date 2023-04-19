import {validation, clearErrorMessage} from './validation';
import {
  clearAllErrorMessages,
  blockElement,
  setSuccessClassName,
  disableInputs,
  hashPassword,
} from './ustils';
import {api} from './api';

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
form.addEventListener('click', handleClearErrorMessage)

function sendData(event) {
  event.preventDefault();

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
    setFormToSuccess();

    const formData = {
      name: nameInput.value,
      lastName: lastNameInput.value,
      dateOfBirth: dateOfBirthInput.value,
      email: emailInput.value,
      password: hashPassword(passwordInput.value),
    };

    api.sendForm('posts', formData);
  }
}


function setFormToSuccess() {
  clearAllErrorMessages(inputs);
  setSuccessClassName(form);
  disableInputs(inputs);
  blockElement(buttonSend);
}

function handleClearErrorMessage(event) {
  const target = event.target;

  if (target.tagName === 'INPUT') {
    clearErrorMessage(target);
  }
}