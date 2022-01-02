import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector,submitFormAdd,configForms) {
    super(popupSelector);
    this._submitFormAdd = submitFormAdd;
    this._configForms = configForms;
    this._popupForm = this._popup.querySelector(this._configForms.formSelector);
    this._popupFormSubmit = this._popup.querySelector(this._configForms.submitButtonSelector);
    this._popupFormInputs = this._popup.querySelectorAll(this._configForms.inputSelector);
  }
  _getInputValues() {
    const inputsData = {};
    this._popupFormInputs.forEach((item) => {
      inputsData[item.id] = item.value;
    })
    return inputsData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormSubmit.addEventListener('click',(evt) => this._submitFormAdd(evt,this._getInputValues()));
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

}