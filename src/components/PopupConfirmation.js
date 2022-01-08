import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector,submitForm,configForms) {
    super(popupSelector);
    this._configForms = configForms;
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(this._configForms.formSelector);
    this._handleRemoveCard = null;
  }
  open(handleRemoveCard){
    this._handleRemoveCard = handleRemoveCard;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit',(evt) => this._submitForm(evt, this._handleRemoveCard));
  }
}