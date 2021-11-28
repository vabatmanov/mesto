class FormValidator {
  constructor(validDate, form) {
    this._validDate = validDate;
    this._form = form;
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._buttonElement = this._form.querySelector(this._validDate.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._validDate.inputSelector));
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validDate.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._validDate.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._validDate.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validDate.errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._validDate.inputErrorClass);
    errorElement.classList.remove(this._validDate.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  clearFormValidation () {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
    this._toggleButtonState();
  }

}
export default FormValidator;