export const templateCard = document.querySelector('#template-cards-item').content;
export const containertCards = document.querySelector('.cards');
export const popupProfileEdit = document.querySelector('.popup_profile-edit');
export const popupCardAdd = document.querySelector('.popup_card-add');
export const popupCardOpen = document.querySelector('.popup_card-open');
export const addButton = document.querySelector('.profile__button-add');
export const editButton = document.querySelector('.profile__button-edit');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');



export const configCard = {
  cardItem: '.cards__item',
  cardsImage: '.cards__image',
  cardsCaption: '.cards__caption',
  cardBin: '.cards__bin',
  cardLike: '.cards__like',
  cardLikeEnable: 'cards__like_enable',
}


export const validDate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__send',
  inactiveButtonClass: 'popup__send_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

export const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];