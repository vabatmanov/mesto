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

//Создание объекта "попап открытие карты"
const popupWithImage = new PopupWithImage(popupCardOpen);
popupWithImage.setEventListeners();


function openPopupWithImage(objectCard) {
  popupWithImage.open(objectCard.link, objectCard.name);
}


//Генерация карты
function createCards(item) {
  const card = new Card(item, templateCard, configCard, openPopupWithImage);
  return card.createCard();
}

//Создание объекта "добавления карт"
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

const userInfo = new UserInfo({
  username: profileName,
  description: profileDescription
});

//Функция отправки формы "Изменения профиля"
function submitFormEdit(event, object) {
  event.preventDefault();
  userInfo.setUserInfo({
    username: object.username,
    description: object.description
  })
  popupWithFormEditProfile.close();
}

const popupWithFormEditProfile = new PopupWithForm(popupProfileEdit,submitFormEdit,validDate)
popupWithFormEditProfile.setEventListeners();

editButton.addEventListener('click', () => {
  const dateProfile = userInfo.getUserInfo();
  inputNameEditForm.value = dateProfile.username;
  inputDescriptEditForm.value = dateProfile.description;
  formValidatorEdit.clearFormValidation();
  popupWithFormEditProfile.open();
});

cardList.renderer();

const formValidatorAdd = new FormValidator(validDate, popupFormAdd);
const formValidatorEdit = new FormValidator(validDate, popupFormEdit);
formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();
