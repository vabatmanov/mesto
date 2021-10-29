const popup = document.querySelector('.popup')
const popupClosed = document.querySelector('.popup__button-close');
const editButton = document.querySelector('.profile__button-edit');
const popupForm = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_contains_name');
const inputHobbies = document.querySelector('.popup__input_contains_hobbies');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

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


editButton.addEventListener('click', openPopup);
popupClosed.addEventListener('click', closePopup);
popup.addEventListener('mouseup', closePopupHandl);
popupForm.addEventListener('submit', submitForm);