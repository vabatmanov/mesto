function enableValidation(validDate) {
  const formList = Array.from(document.querySelectorAll(validDate.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement,validDate);
  });
}
function setEventListeners(formElement, validDate) {
  const buttonElement = formElement.querySelector(validDate.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validDate.inputSelector));
  toggleButtonState(inputList, buttonElement, validDate);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, validDate);
      checkInputValidity(formElement, inputElement, validDate);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validDate) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validDate.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(validDate.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function showInputError (formElement, inputElement, errorMessage, validDate) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(validDate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validDate.errorClass);
};

function hideInputError (formElement, inputElement, validDate) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(validDate.inputErrorClass);
  errorElement.classList.remove(validDate.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement, validDate) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validDate);
  } else {
    hideInputError(formElement, inputElement, validDate);
  }
};