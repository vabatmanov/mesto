const initialCards = [
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

const templateCard = document.querySelector('#template-cards-item').content;
const listCards = document.querySelector('.cards');

// Popup
const popup = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup__image');
const popupNameImage = document.querySelector('.popup__name-image');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupCardAdd = document.querySelector('.popup_card-add');
const popupCardOpen = document.querySelector('.popup_card-open');

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

function closePopupHandle(event) {
  if (event.target.classList.contains('popup')) {
    togglePopup(event.target);
  }
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function submitFormEdit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputHobbies.value;
  togglePopup(popupProfileEdit);
}

function submitFormAdd(event) {
  event.preventDefault();
  createCards ({
    name: inputCardName.value,
    link: inputCardLink.value
  });
  inputCardName.value = '';
  inputCardLink.value = '';
  togglePopup(popupCardAdd);
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
      addCard(createFormCard(objectCard));
    })
  } else {
    addCard(createFormCard(item));
  }

  function createFormCard(card) {
    const templateCardItem = templateCard.querySelector('.cards__item').cloneNode(true);
    templateCardItem.querySelector('.cards__image').alt = 'Изображение ' + card.name;
    templateCardItem.querySelector('.cards__image').src = card.link;
    templateCardItem.querySelector('.cards__caption').textContent = card.name;
    templateCardItem.querySelector('.cards__image').addEventListener('click', function (evt) {
      popupImage.src = evt.target.src;
      popupImage.alt = evt.target.alt;
      popupNameImage.textContent = evt.target.nextElementSibling.textContent;
      togglePopup(popupCardOpen);
    })
    templateCardItem.querySelector('.cards__bin').addEventListener('click', function (evt) {
      evt.target.closest('.cards__item').remove();
    });
    templateCardItem.querySelector('.cards__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like_enable');
    });
    return templateCardItem;
  }
}

popup.forEach((item) => {
  item.addEventListener('mouseup', closePopupHandle);
})
popupFormEdit.addEventListener('submit', submitFormEdit);
popupFormAdd.addEventListener('submit', submitFormAdd);
editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputHobbies.value = profileDescription.textContent;
  togglePopup(popupProfileEdit);
});
addButton.addEventListener('click', () => togglePopup(popupCardAdd));
editButtonClose.addEventListener('click', () => togglePopup(popupProfileEdit));
addButtonClose.addEventListener('click', () => togglePopup(popupCardAdd));
openButtonClose.addEventListener('click', () => togglePopup(popupCardOpen));

//Инициализация Шесть карточек «из коробки»
createCards(initialCards);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__send',
  inactiveButtonClass: 'popup__send_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});