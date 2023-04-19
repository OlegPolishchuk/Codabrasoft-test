import Crypto from "crypto-js";

import {clearErrorMessage} from "./validation";

export function clearAllErrorMessages(inputs) {
  for (let input of inputs) {
    clearErrorMessage(input);
  }
}

export function setSuccessClassName(element) {
  element.classList.add('success');
}

export function disableInputs(inputs) {
  for(let input of inputs) {
    blockElement(input);
  }
}

export function blockElement(element) {
  element.setAttribute('disabled', true);
}

export function unBlockElement(element) {
  element.removeAttribute('disabled');
}

export function hashPassword(password) {
  const salt = 'salt';
  const hash = Crypto.SHA256(password + salt);

  return hash.toString(Crypto.enc.Base64);
}

