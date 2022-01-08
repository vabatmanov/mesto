import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageName = this._popup.querySelector('.popup__name-image');
  }

  open(cardImageLink, cardImageCaption) {
    this._popupImage.src = cardImageLink;
    this._popupImage.alt = cardImageCaption;
    this._popupImageName.textContent = cardImageCaption;
    super.open();
  }
}