export default class Card {
  constructor(objectCard, templateCard, conf) {
    this._conf = conf;
    this._card = templateCard.querySelector(this._conf.cardItem).cloneNode(true);;
    this._objectCard = objectCard;
  }

  _genCard() {
    this._card.querySelector(this._conf.cardsImage).alt = 'Изображение ' + this._objectCard.name;
    this._card.querySelector(this._conf.cardsImage).src = this._objectCard.link;
    this._card.querySelector(this._conf.cardsCaption).textContent = this._objectCard.name;
  }

  _setEvent() {
/*    this._card.querySelector(this._conf.cardsImage).addEventListener('click', (evt) => {
      this._conf.popupImage.src = evt.target.src;
      this._conf.popupImage.alt = evt.target.alt;
      this._conf.popupNameImage.textContent = evt.target.closest(this._conf.cardItem).querySelector(this._conf.cardsCaption).textContent;
      this._conf.openPopup(this._conf.popupCardOpen);
    })
*/
    this._card.querySelector(this._conf.cardsImage).addEventListener('click', (evt) => {
      //Тут добавить функцию колбэк из PopupWithForm Open.
    })

    this._card.querySelector(this._conf.cardBin).addEventListener('click', (evt) => {
      evt.target.closest(this._conf.cardItem).remove();
    });

    this._card.querySelector(this._conf.cardLike).addEventListener('click', (evt) => {
      evt.target.classList.toggle(this._conf.cardLikeEnable);
    });
  }

  createCard() {
    this._genCard();
    this._setEvent();
    return this._card;
  }

}