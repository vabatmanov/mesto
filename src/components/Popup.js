export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeOverlayPopup = this._closeOverlayPopup.bind(this);
    this.open = this.open.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._closeOverlayPopup);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._closeOverlayPopup);
  }

  _closeOverlayPopup(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__button-close').addEventListener('click', () => this.close());
    //this._popup.addEventListener('click', (evt) => this._closeOverlayPopup(evt));
  }
}