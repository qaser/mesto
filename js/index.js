import {initialCards} from './fixture.js';
import {Card} from './Card.js';
import {FormValidator, buttonActive, buttonPassive} from './FormValidator.js'

// данные пользователя
const userName = document.querySelector('.intro__user-name');
const userOccupation = document.querySelector('.profile__occupation');

// всплывающие окна
const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
export const popupImage = document.querySelector('#popup-image');

// карточки мест и шаблон
const placesList = document.querySelector('.places__items');

// формы для отправки данных, введенных пользователем
const formPlace = document.querySelector('#form-place');
const formProfile = document.querySelector('#form-profile');
const formList = [formPlace, formProfile];
const inputNameForm = document.querySelector('#user-name');
const inputOccupationForm = document.querySelector('#user-occupation');
const inputPlaceForm = document.querySelector('#place-name');
const inputLinkForm = document.querySelector('#place-link');

// кнопки
const btnProfileEdit = document.querySelector('.intro__edit-button');
const btnAddPlace = document.querySelector('.profile__button');
const btnsClosePopup = document.querySelectorAll('.popup__button-close');
const btnSubmitProfile = formProfile.querySelector('.form__button');
const btnSubmitPlace = formPlace.querySelector('.form__button');

// атрибуты картинки
const image = popupImage.querySelector('.popup__image');
const imageTitle = popupImage.querySelector('.popup__image-title');

// ошибки форм
const errorFieldsPlace = Array.from(formPlace.querySelectorAll('.form__input-error'));
const inputFieldsPlace = Array.from(formPlace.querySelectorAll('.form__input'));
const errorFieldsProfile = Array.from(formProfile.querySelectorAll('.form__input-error'));
const inputFieldsProfile = Array.from(formProfile.querySelectorAll('.form__input'));

// словарь с селекторами и классами форм, использую при валидации форм
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  disactiveButtonClass: 'form__button_disactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

// функция для создания экземпляра карточки
function renderCard(item) {
  const cardInstance = new Card(item, '.places__item-template').generateCard();
  return cardInstance;
}


// предварительное заполнение страницы карточками
initialCards.forEach((item) => {
  const _card = renderCard(item);
  placesList.append(_card);
})


// создание валидаторов форм
formList.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
})


// функция вставки текущих данных пользователя в форму
function fillUserData() {
  inputNameForm.value = userName.textContent;
  inputOccupationForm.value = userOccupation.textContent;
}


// функция заполнения аттрибутов картинки в тег <img>
export function fillImageData(item) {
  image.src = item._link;
  image.alt = item._name;
  imageTitle.textContent = item._name;
}


// функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  // слушатель кнопки Escape
  document.addEventListener('keydown', (evt) => {
    closeByEscape(evt, popup);
  })
  // слушатель нажатия вне попапа
  popup.addEventListener('click', (evt) => {
    closeByOverlay(evt, popup);
  })
}


// закрытие попапа по нажатию кнопки Escape
function closeByEscape(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  };
};


// закрытие попапа по нажатию вне попапа
function closeByOverlay(evt, popup) {
  if (evt.target === popup) {
    closePopup(popup);
  };
};


// функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("click", closeByOverlay);
}


// функция отправки данных, введенных в форму
function submitFormProfile(evt) {
  userName.textContent = inputNameForm.value;
  userOccupation.textContent = inputOccupationForm.value;
  closePopup(popupProfile);
}


// функция формирования данных из формы для новой карточки места
function submitFormPlace(evt) {
  const newItem = {
    name: inputPlaceForm.value,
    link: inputLinkForm.value
  };
  const _card = renderCard(newItem);
  placesList.prepend(_card);
  closePopup(popupPlace);
}


// сброс сообщений валидации и стиля полей
function resetErrorsForm(errors, inputs) {
  errors.forEach((error) => {
    error.textContent = '';
  });
  inputs.forEach((input) => {
    input.classList.remove('form__input_invalid');
  })
}


// диспетчеры событий
formPlace.addEventListener('submit', submitFormPlace);
formProfile.addEventListener('submit', submitFormProfile);
btnProfileEdit.addEventListener('click', () => {
  resetErrorsForm(errorFieldsProfile, inputFieldsProfile);
  fillUserData();
  buttonActive(btnSubmitProfile, 'form__button_disactive') // активация кнопки
  openPopup(popupProfile);
});
btnAddPlace.addEventListener('click', () => {
  formPlace.reset(); // очистка ранее введенных данных в инпутах
  resetErrorsForm(errorFieldsPlace, inputFieldsPlace);
  buttonPassive(btnSubmitPlace, 'form__button_disactive') // кнопка пассивна
  openPopup(popupPlace);
});
// обработчики для кнопок закрытия
btnsClosePopup.forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => {
    closePopup(popup);
  });
});
