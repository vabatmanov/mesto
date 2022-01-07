import './index.css';
import Api from "../components/Api";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  templateCard,
  configCard,
  validDate,
  containertCards,
  popupProfileEdit,
  popupCardAdd,
  popupRemoveCard,
  popupCardOpen,
  popupUpdateAvatar,
  addButton,
  editButton,
  editAvatarButton,
  profileName,
  profileDescription,
  profileAvatar,
  inputNameEditForm,
  inputDescriptEditForm,
  popupFormEdit,
  popupFormAdd,
  popupFormAvatar
} from '../utils/constants.js';

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-32/',
  token: 'OTYwM2YwMzktMDdlNi00MmQ4LThlZTEtZmY1Mzk5ZGU3MTQ2'
})

function submitRemoveCard(evt,{handleRemoveCard,_id} ) {
  evt.preventDefault();
  api.removeCard(_id)
    .then(() => {
      handleRemoveCard();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(popupWithRemoveCard.close)
}

//Создание объекта "удаления карты"
const popupWithRemoveCard = new PopupWithForm(popupRemoveCard,submitRemoveCard,validDate)
popupWithRemoveCard.setEventListeners();

function handleBinCardClick(handleRemoveCard) {
  popupWithRemoveCard.open(handleRemoveCard);
}


//Создание объекта "попап открытие карты"
const popupWithImage = new PopupWithImage(popupCardOpen);
popupWithImage.setEventListeners();

//Функция открытия Popup просмотра картинки
function handleCardClick(objectCard) {
  popupWithImage.open(objectCard.link, objectCard.name);
}

function handleLikeCardClick({updateLike, liked, cardId}) {
  api.like({cardId, liked})
    .then(result => {
      updateLike(result.likes.length);
    })
    .catch(error => {
      console.log(error)
    })
}

//Генерация карты
function createCards(cardData) {
  const card = new Card(cardData, templateCard, configCard, handleCardClick, handleBinCardClick,userInfo.getUserInfo()._id,handleLikeCardClick);
  return card.createCard();
}

//Создание объекта "Section"
const cardList = new Section({
  renderer: (cardData) => {
    cardList.addItem(createCards(cardData));
  }
},containertCards);

//Функция отправки формы "Добавить карточку"
function submitFormAdd(event,cardData) {
  event.preventDefault();
  api.addCard({name: cardData.cardName, link: cardData.cardLink})
    .then(result => {
      cardList.addItem(createCards(result));
    })
    .catch(error => {
      console.log(error)
    })
    .finally(popupWithFormAddCard.close)
}

//Создание объекта "попап добавления карты"
const popupWithFormAddCard = new PopupWithForm(popupCardAdd,submitFormAdd,validDate)
popupWithFormAddCard.setEventListeners();

addButton.addEventListener('click', () => {
  popupWithFormAddCard.open();
  formValidatorAdd.clearFormValidation();
});

//Создание объекта UserInfo
const userInfo = new UserInfo({
  username: profileName,
  description: profileDescription,
  avatar: profileAvatar
});

//Функция отправки формы "Изменения профиля"
function submitFormEdit(event, userData) {
  event.preventDefault();
  api.editProfile(userData)
     .then(result => {
       userInfo.setUserInfo(result);
     })
     .catch(error => {
         console.log(error)
     })
    .finally(popupWithFormEditProfile.close)
}

//Создание объекта "попап редактирования профиля"
const popupWithFormEditProfile = new PopupWithForm(popupProfileEdit,submitFormEdit,validDate)
popupWithFormEditProfile.setEventListeners();

editButton.addEventListener('click', () => {
  const dateProfile = userInfo.getUserInfo();
  inputNameEditForm.value = dateProfile.name;
  inputDescriptEditForm.value = dateProfile.about;
  formValidatorEdit.clearFormValidation();
  popupWithFormEditProfile.open();
});

function submitFormEditAvatar(evt,avatarUrl) {
  api.updateAvatar({avatar: avatarUrl.linkAvatar})
    .then(result => {
      userInfo.setUserInfo(result);
    })
    .catch(error => {
      console.log(error)
    })
    .finally(popupWithFormEditAvatar.close)
}

//Создание объекта "попап редактирования аватарки"
const popupWithFormEditAvatar = new PopupWithForm(popupUpdateAvatar,submitFormEditAvatar,validDate)
popupWithFormEditAvatar.setEventListeners();

editAvatarButton.addEventListener('click', () => popupWithFormEditAvatar.open());

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderer(cards);
  })

//Создание и включения валидации форм
const formValidatorAdd = new FormValidator(validDate, popupFormAdd);
const formValidatorEdit = new FormValidator(validDate, popupFormEdit);
const formValidatorAvatar = new FormValidator(validDate, popupFormAvatar);
formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAvatar.enableValidation();