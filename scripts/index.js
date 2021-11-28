import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./initial-сards.js"

const validDate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__send',
  inactiveButtonClass: 'popup__send_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const templateCard = document.querySelector('#template-cards-item').content;
const listCards = document.querySelector('.cards');

// Popup
//const popup = document.querySelectorAll('.popup');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupCardAdd = document.querySelector('.popup_card-add');
const popupCardOpen = document.querySelector('.popup_card-open');
const popupImage = document.querySelector('.popup__image');
const popupNameImage = document.querySelector('.popup__name-image');

//Button open
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');

//Button close
const editButtonClose = document.querySelector('.popup__button-close_profile-edit');
const addButtonClose = document.querySelector('.popup__button-close_card-add');
const openButtonClose = document.querySelector('.popup__button-close_card-open');

//Forms
const popupFormEdit = document.querySelector('.popup__form_profile-edit');
const popupFormAdd = document.querySelector('.popup__form_card-add');

//Input
const inputName = document.querySelector('.popup__input_contains_name');
const inputHobbies = document.querySelector('.popup__input_contains_hobbies');
const inputCardName = document.querySelector('.popup__input_contains_card-name');
const inputCardLink = document.querySelector('.popup__input_contains_card-link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//Открыть popup
function openPopup(elementPopup) {
  elementPopup.classList.add('popup_opened');
  elementPopup.addEventListener('click', closeOverlayPopup);
  document.addEventListener('keydown', closeEscapePopup);
}

//Закрыть popup
function closePopup(elementPopup) {
  elementPopup.classList.remove('popup_opened');
  elementPopup.removeEventListener('click', closeOverlayPopup);
  document.removeEventListener('keydown', closeEscapePopup);
}

//Закрыть при клике на оверлей
function closeOverlayPopup(element) {
  if (element.target.classList.contains('popup')) {
    closePopup(element.target);
  }
}

//Закрыть при нажатии на Escape
function closeEscapePopup(element) {
  if (element.key === "Escape"){
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Функция отправки формы "Изменения профиля"
function submitFormEdit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputHobbies.value;
  closePopup(popupProfileEdit);
}

//Функция отправки формы "Добавить карточку"
function submitFormAdd(event) {
  event.preventDefault();
  createCards ({
    name: inputCardName.value,
    link: inputCardLink.value
  });
  closePopup(popupCardAdd);
}

//добавить карту
function addCard(card) {
  listCards.prepend(card);
}

/* Сформировать карту
Принимает объект {name,link} или массив объектов [{name,link},{name,link},...] */
function createCards(item) {
  if (Array.isArray(item)) {
    item.forEach(function (objectCard) {
      const card = new Card(objectCard, templateCard, conf, openPopup);
      addCard(card.createCard());
    })
  } else {
    const card = new Card(item, templateCard, conf, openPopup);
    addCard(card.createCard());
  }
}

//События кнопок закрыть
editButtonClose.addEventListener('click', () => closePopup(popupProfileEdit));
addButtonClose.addEventListener('click', () => closePopup(popupCardAdd));
openButtonClose.addEventListener('click', () => closePopup(popupCardOpen));

//Событие открытия окна редактирования профиля
editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputHobbies.value = profileDescription.textContent;
  formValidatorEdit.clearFormValidation();
  openPopup(popupProfileEdit);
});

//Событие открытия окна добавление карточки
addButton.addEventListener('click', () => {
  popupFormAdd.reset();
  formValidatorAdd.clearFormValidation();
  openPopup(popupCardAdd)
});

//События отправки форм
popupFormEdit.addEventListener('submit', submitFormEdit);
popupFormAdd.addEventListener('submit', submitFormAdd);

const conf = {
  cardItem: '.cards__item',
  cardsImage: '.cards__image',
  cardsCaption: '.cards__caption',
  cardBin: '.cards__bin',
  cardLike: '.cards__like',
  cardLikeEnable: 'cards__like_enable',
  popupImage: popupImage,
  popupNameImage: popupNameImage,
  popupCardOpen: popupCardOpen,
  openPopup: openPopup
}

//Инициализация Шесть карточек «из коробки»
createCards(initialCards);
const formValidatorAdd = new FormValidator(validDate, popupFormAdd);
const formValidatorEdit = new FormValidator(validDate, popupFormEdit);
formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();