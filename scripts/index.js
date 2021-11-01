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

// Popup
const popup = document.querySelectorAll('.popup');
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

//Button send
/*const sendButtonProfile = document.querySelector('.popup__send_profile-edit');
const sendButtonCard = document.querySelector('.popup__send_card-add');*/

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
  togglePopup(event.target);
}

function togglePopup(popup) {
  popup.classList.toggle('popup_open');
}

function submitFormEdit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputHobbies.value;
  togglePopup(popupProfileEdit);
}
function submitFormAdd(event) {
  event.preventDefault();
  addCardItems ([{
    name: inputCardName.value,
    link: inputCardLink.value
  }])
  togglePopup(popupCardAdd);
}


/* Работа №5 */
function addCardItems (list) {
  const templateCard = document.querySelector('#template-cards-item').content;
  const listCards = document.querySelector('.cards');

  list.forEach(function (item) {
    const templateCardItem = templateCard.querySelector('.cards__item').cloneNode(true);
    templateCardItem.querySelector('.cards__image').alt = 'Изображение ' + item.name;
    templateCardItem.querySelector('.cards__image').src = item.link;
    templateCardItem.querySelector('.cards__caption').textContent = item.name;
    templateCardItem.querySelector('.cards__image').addEventListener('click', function () {
      //тут действия при открытии попапа, загрузка картинки и текста.
      togglePopup(popupCardOpen);
    })
    templateCardItem.querySelector('.cards__bin').addEventListener('click', function (evt) {
      evt.target.closest('.cards__item').remove();
    });
    templateCardItem.querySelector('.cards__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like_enable');
    });

    listCards.prepend(templateCardItem);
  })
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
addCardItems(initialCards);