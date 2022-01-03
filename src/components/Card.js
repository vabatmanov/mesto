export default class Card {
  constructor(objectCard, templateCard, conf, openPopupWithImage) {
    this._conf = conf;
    this._card = templateCard.querySelector(this._conf.cardItem).cloneNode(true);
    this._cardLike = this._card.querySelector(this._conf.cardLike);
    this._objectCard = objectCard;
    this._openPopupWithImage = openPopupWithImage;
    this._handleRemoveCard = this._handleRemoveCard.bind(this);
  }

  _genCard() {
    this._card.querySelector(this._conf.cardsImage).alt = 'Изображение ' + this._objectCard.name;
    this._card.querySelector(this._conf.cardsImage).src = this._objectCard.link;
    this._card.querySelector(this._conf.cardsCaption).textContent = this._objectCard.name;
  }

  _addLike(){
    this._cardLike.classList.add(this._conf.cardLikeEnable);
  }

  _removeLike(){
    this._cardLike.classList.remove(this._conf.cardLikeEnable);
  }

  _handleRemoveCard(){
    this._card.remove();
    this._card = null;
  }

  _setEvent() {
    this._card.querySelector(this._conf.cardsImage).addEventListener('click', () => {
      this._openPopupWithImage(this._objectCard);
    })

    this._card.querySelector(this._conf.cardBin).addEventListener('click', this._handleRemoveCard);

    this._cardLike.addEventListener('click', () => {
      (this._cardLike.classList.contains(this._conf.cardLikeEnable)) ? this._removeLike() : this._addLike();
    });
  }

  createCard() {
    this._genCard();
    this._setEvent();
    return this._card;
  }

}