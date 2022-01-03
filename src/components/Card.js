export default class Card {
  constructor(objectCard, templateCard, conf, openPopupWithImage) {
    this._conf = conf;
    this._card = templateCard.querySelector(this._conf.cardItem).cloneNode(true);
    this._objectCard = objectCard;
    this._openPopupWithImage = openPopupWithImage;
  }

  _genCard() {
    this._card.querySelector(this._conf.cardsImage).alt = 'Изображение ' + this._objectCard.name;
    this._card.querySelector(this._conf.cardsImage).src = this._objectCard.link;
    this._card.querySelector(this._conf.cardsCaption).textContent = this._objectCard.name;
  }

  _setEvent() {
    this._card.querySelector(this._conf.cardsImage).addEventListener('click', () => {
      this._openPopupWithImage(this._objectCard);
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