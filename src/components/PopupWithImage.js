import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(cardImageLink, cardImageCaption) {
    this._popup.querySelector('.popup__image').src = cardImageLink;
    this._popup.querySelector('.popup__image').alt = cardImageCaption;
    this._popup.querySelector('.popup__name-image').textContent = cardImageCaption;
    super.open();
  }
}