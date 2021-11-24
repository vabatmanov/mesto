class Card {
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

  }

  createCard() {
    this._genCard();
    return this._card;
  }

}

export default Card;