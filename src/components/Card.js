export default class Card {
  constructor(objectCard, templateCard, conf, openPopupWithImage, handleBinCardClick,_id,handleLikeCardClick) {
    this._conf = conf;
    this._card = templateCard.querySelector(this._conf.cardItem).cloneNode(true);
    this._cardLike = this._card.querySelector(this._conf.cardLike);
    this._cardBin = this._card.querySelector(this._conf.cardBin);
    this._objectCard = objectCard;
    this._openPopupWithImage = openPopupWithImage;
    this._handleBinCardClick = handleBinCardClick;
    this._handleLikeCardClick = handleLikeCardClick;
    this._userId = _id;
    this._cardId = this._objectCard._id;
    this._handleRemoveCard = this._handleRemoveCard.bind(this);
    this._liked = this._liked.bind(this);
    this._updateLike = this._updateLike.bind(this);
    this._addLike = this._addLike.bind(this);
    this._removeLike = this._removeLike.bind(this);
  }

  _genCard() {
    this._card.querySelector(this._conf.cardsImage).alt = 'Изображение ' + this._objectCard.name;
    this._card.querySelector(this._conf.cardsImage).src = this._objectCard.link;
    this._card.querySelector(this._conf.cardsCaption).textContent = this._objectCard.name;
    this._updateLikeNumber(this._objectCard.likes.length);
    this._searchMyLike();
    this._hideBin();
    //console.log(this._objectCard);
  }

  _liked(){
    if (this._cardLike.classList.contains(this._conf.cardLikeEnable)) {
      return true;
    } else {
      return false;
    }
  }

  _updateLikeNumber(number){
    this._card.querySelector(this._conf.cardLiked).textContent = number;
  }

  _searchMyLike() {
    if (this._objectCard.likes.some((like) => {
      return like._id === this._userId;
    })) {
      this._addLike();
    }
  }

  _addLike(){
    this._cardLike.classList.add(this._conf.cardLikeEnable);
  }

  _updateLike(number){
    if (this._liked()) {
      this._removeLike()
    } else {
      this._addLike();
    }
    this._updateLikeNumber(number);
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
      this._handleLikeCardClick({updateLike: this._updateLike, liked:this._liked, cardId:this._cardId});
    });
  }

  createCard() {
    this._genCard();
    this._setEvent();
    return this._card;
  }

}