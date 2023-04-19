const minLength = 2;
const maxLength = 25;
const requiredErrorMessage = 'Поле обязательно для заполнения';
const lengthErrorMessage = `Минимальное кол-во символов - ${minLength}, максимальное - ${maxLength}`;
const dateErrorMessage = 'Максимальная дата - сегодня';
const emailErrorMessage = 'Некорректный адрес электронной почты';
const confirmPasswordErrorMessage = 'Пароли не совпадают';

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validation = {
  validateRequired(inputs) {
    let errorsCount = 0;

    for(let input of inputs) {
      const isValid = input.value.trim().length > 0;

      if (!isValid) {
        clearErrorMessage(input);
        setErrorMessage(input, requiredErrorMessage);
        errorsCount++;
      }
    }

    return errorsCount === 0;
  },

  validateLength(input) {
    const length = input.value.trim().length;
    const isValid = length >= minLength && length <= maxLength;

    if (!isValid) {
      clearErrorMessage(input);

      const message = length === 0 ? requiredErrorMessage : lengthErrorMessage;
      setErrorMessage(input, message);
      return false;
    }
    return true;
  },

  validateDate(input) {
    const today = new Date();

    if (new Date(input.value) > today) {
      console.log('date is invalid')
      setErrorMessage(input, dateErrorMessage)
      return false;
    }
    return true;
  },

  validateEmail(input) {
    const value = input.value;

    if (!emailRegExp.test(value)) {
      clearErrorMessage(input);
      setErrorMessage(input, emailErrorMessage);

      return false;
    }

    return true;
  },

  validatePassword(input) {
    clearErrorMessage(input);

    const password = input.value;
    let message = '';
    let errorsCount = 0;
    let isValid = false;

    if (password.length < 8) {
      message = 'Пароль должен содержать минимум 8 символов';
      errorsCount++;
    }
    if (!/[A-Z]/.test(password)) {
      message = 'Должен быть минимум 1 символ в верхнем регистре';
      errorsCount++;
    }
    if (!/[1-9]/.test(password)) {
      message = 'Должна быть минимум 1 цифра от 1 до 9';
      errorsCount++;
    }
    if (!/[!@#$%]/.test(password)) {
      message = 'Должен быть минимум 1 специальный символ';
      errorsCount++;
    }

    setErrorMessage(input, message);

    if (errorsCount === 0) {
      isValid = true;
      clearErrorMessage(input);
    }

    return isValid;
  },

  confirmPasswords(passwordInput, confirmPasswordInput) {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      clearErrorMessage(confirmPasswordInput);
      setErrorMessage(confirmPasswordInput, confirmPasswordErrorMessage);

      return false;
    }

    return true;
  }

}


function setErrorMessage(input, message) {
  const parent = input.parentNode;
  const span = document.createElement('span');

  input.classList.add('error');
  span.setAttribute('class', 'error error__message');
  span.innerText = message;

  parent.appendChild(span);
}

export function clearErrorMessage(input) {
  const parent = input.parentNode;
  const span = parent.querySelector('.error__message');

  input.classList.remove('error');
  span && parent.removeChild(span);
}

