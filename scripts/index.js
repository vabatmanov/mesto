const popup = document.querySelector('.popup')
const popupClosed = document.querySelector('.popup__button-close');
const editButton = document.querySelector('.profile__button-edit');
const popupForm = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_contains_name');
const inputHobbies = document.querySelector('.popup__input_contains_hobbies');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
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


function closePopupHandl(event) {
  if (event.target.classList.contains('popup')) {
    closePopup();
  }
}

function closePopup() {
  popup.classList.remove('popup_open');
}

function openPopup() {
  popup.classList.add('popup_open');
  inputName.value = profileName.textContent;
  inputHobbies.value = profileDescription.textContent;
}

function submitForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputHobbies.value;
  closePopup();
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
    templateCardItem.querySelector('.cards__bin').addEventListener('click', function (evt) {
      evt.target.closest('.cards__item').remove();
    });
    templateCardItem.querySelector('.cards__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like_enable');
    });

    listCards.prepend(templateCardItem);

    console.log(templateCardItem);
  })
}


editButton.addEventListener('click', openPopup);
popupClosed.addEventListener('click', closePopup);
popup.addEventListener('mouseup', closePopupHandl);
popupForm.addEventListener('submit', submitForm);

//Инициализация Шесть карточек «из коробки»
addCardItems(initialCards);