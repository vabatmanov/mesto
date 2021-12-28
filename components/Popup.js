export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this)
  }
  _handleEscClose(evt){
    if (evt.key === "Escape"){
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _closeOverlayPopup(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__button-close').addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => this._closeOverlayPopup(evt));
  }
}
