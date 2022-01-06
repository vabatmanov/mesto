import './index.css';
import Api from "../components/Api";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  cards,
  templateCard,
  configCard,
  validDate,
  containertCards,
  popupProfileEdit,
  popupCardAdd,
  popupCardOpen,
  addButton,
  editButton,
  profileName,
  profileDescription,
  inputNameEditForm,
  inputDescriptEditForm,
  popupFormEdit,
  popupFormAdd
} from '../utils/constants.js';

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-32/',
  token: 'OTYwM2YwMzktMDdlNi00MmQ4LThlZTEtZmY1Mzk5ZGU3MTQ2'
})





//Создание объекта "попап открытие карты"
const popupWithImage = new PopupWithImage(popupCardOpen);
popupWithImage.setEventListeners();

//Функция открытия Popup просмотра картинки
function handleCardClick(objectCard) {
  popupWithImage.open(objectCard.link, objectCard.name);
}

//Генерация карты
function createCards(item) {
  const card = new Card(item, templateCard, configCard, handleCardClick);
  return card.createCard();
}

//Создание объекта "Section"
const cardList = new Section({
  items: cards,
  renderer: (item) => {
    cardList.addItem(createCards(item));
  }
},containertCards);

//Функция отправки формы "Добавить карточку"
function submitFormAdd(event,item) {
  event.preventDefault();
  cardList.addItem(createCards(item));
  popupWithFormAddCard.close();
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
  description: profileDescription
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
  popupWithFormEditProfile.close();
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

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderer(cards);
  })



//инициализация карт
//cardList.renderer();

//Создание и включения валидации форм
const formValidatorAdd = new FormValidator(validDate, popupFormAdd);
const formValidatorEdit = new FormValidator(validDate, popupFormEdit);
formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();