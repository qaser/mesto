// кнопка открытия формы для редактирования данных пользователя
let buttonOpenPopup = document.querySelector('.intro__edit-button');
// кнопка закрытия формы для редактирования данных пользователя
let buttonClosePopup = document.querySelector('.popup__button-close');
// форма - для отправки данных, введенных пользователем
let formElement = document.querySelector('.form')
// имя пользователя
let userName = document.querySelector('.intro__user-name');
// род занятий пользователя
let userOccupation = document.querySelector('.profile__occupation');
// всплывающее окно
let popupToggle = document.querySelector('.popup');
// инпут для имени пользователя (доступ по id)
let inputNameForm = document.querySelector('#user-name');
// инпут для профессии пользователя (доступ по id)
let inputOccupationForm = document.querySelector('#user-occupation');

// функция вставки текущих данных пользователя в форму
function userDataForm() {
  inputNameForm.value = userName.textContent;
  inputOccupationForm.value = userOccupation.textContent;
}

// функция открытия попапа-формы
function openPopup() {
  userDataForm();
  popupToggle.classList.toggle('popup_opened');
}

// функция открытия попапа-формы
function closePopup() {
  popupToggle.classList.toggle('popup_opened');
}

// функция отправки данных, введенных в форму
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = inputNameForm.value;
  userOccupation.textContent = inputOccupationForm.value;
  closePopup();
}

buttonOpenPopup.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
