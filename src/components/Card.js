export default class Card {
  constructor(objectCard, templateCard, conf, openPopupWithImage, handleBinCardClick,_id) {
    this._conf = conf;
    this._card = templateCard.querySelector(this._conf.cardItem).cloneNode(true);
    this._cardLike = this._card.querySelector(this._conf.cardLike);
    this._cardBin = this._card.querySelector(this._conf.cardBin);
    this._objectCard = objectCard;
    this._openPopupWithImage = openPopupWithImage;
    this._handleBinCardClick = handleBinCardClick;
    this._userId = _id;
    this._handleRemoveCard = this._handleRemoveCard.bind(this);
  }

  _genCard() {
    this._card.querySelector(this._conf.cardsImage).alt = 'Изображение ' + this._objectCard.name;
    this._card.querySelector(this._conf.cardsImage).src = this._objectCard.link;
    this._card.querySelector(this._conf.cardsCaption).textContent = this._objectCard.name;
    this._card.querySelector(this._conf.cardliked).textContent = (this._objectCard.likes).length;
    this._hideBin();
    console.log(this._objectCard);
  }

  _addLike(){
    this._cardLike.classList.add(this._conf.cardLikeEnable);
  }

  _removeLike(){
    this._cardLike.classList.remove(this._conf.cardLikeEnable);
  }

  _hideBin(){
    if (this._objectCard.owner._id !== this._userId) {
      this._cardBin.classList.add(this._conf.cardBinHide);
    }
  }

  _handleRemoveCard(){
    this._card.remove();
    this._card = null;
  }

  _setEvent() {
    this._card.querySelector(this._conf.cardsImage).addEventListener('click', () => {
      this._openPopupWithImage(this._objectCard);
    })

    this._cardBin.addEventListener('click', () => {
      this._handleBinCardClick(
        {
          handleRemoveCard: this._handleRemoveCard,
          _id: this._objectCard._id
        });
      }
    );

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