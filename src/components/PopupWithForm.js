import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector,submitForm,configForms, buttonStatus = null) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._configForms = configForms;
    this._popupForm = this._popup.querySelector(this._configForms.formSelector);
    this._popupFormSubmit = this._popup.querySelector(this._configForms.submitButtonSelector);
    this._popupFormInputs = this._popup.querySelectorAll(this._configForms.inputSelector);
    this._buttonStatus = buttonStatus;
    this._buttonLoad = this._buttonLoad.bind(this);
  }

  _buttonLoad(){
    if (this._popupFormSubmit.textContent === this._buttonStatus.on) {
      this._popupFormSubmit.textContent = this._buttonStatus.off;
    } else {
      this._popupFormSubmit.textContent = this._buttonStatus.on;
    }
  }

  _getInputValues() {
    this._buttonLoad();
    const inputsData = {};
    this._popupFormInputs.forEach((item) => {
      inputsData[item.id] = item.value;
    })

    return inputsData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormSubmit.addEventListener('click',(evt) => this._submitForm(evt,
      (this._handleRemoveCard)?this._handleRemoveCard:this._getInputValues(),
      this._buttonLoad
    ));
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}