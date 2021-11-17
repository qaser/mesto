let openPopup = document.querySelector('.intro__edit-button');
let closePopup = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.form')
let inputForm = document.querySelectorAll('.form__input');
let userName = document.querySelector('.intro__username');
let userOccupation = document.querySelector('.profile__occupation');

function userDataForm() {
  inputForm[0].value = userName.textContent;
  inputForm[1].value = userOccupation.textContent;
}

function openClosePopup() {
  userDataForm();
  let popupToggle = document.querySelector('.popup');
  popupToggle.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = inputForm[0].value;
  userOccupation.textContent = inputForm[1].value;
  openClosePopup();
}

openPopup.addEventListener('click', openClosePopup);
closePopup.addEventListener('click', openClosePopup);
formElement.addEventListener('submit', formSubmitHandler);
