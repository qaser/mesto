export const initialCards = [
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

// данные пользователя
export const userName = document.querySelector('.intro__user-name');
export const userOccupation = document.querySelector('.profile__occupation');

// всплывающие окна
export const popupProfile = document.querySelector('#popup-profile');
export const popupPlace = document.querySelector('#popup-place');
export const popupImage = document.querySelector('#popup-image');

// карточки мест и шаблон
export const placesList = document.querySelector('.places__items');

// формы для отправки данных, введенных пользователем
export const formPlace = document.querySelector('#form-place');
export const formProfile = document.querySelector('#form-profile');
export const formList = [formPlace, formProfile];
export const inputNameForm = document.querySelector('#user-name');
export const inputOccupationForm = document.querySelector('#user-occupation');
export const inputPlaceForm = document.querySelector('#place-name');
export const inputLinkForm = document.querySelector('#place-link');

// кнопки
export const btnProfileEdit = document.querySelector('.intro__edit-button');
export const btnAddPlace = document.querySelector('.profile__button');
export const btnsClosePopup = document.querySelectorAll('.popup__button-close');
export const btnSubmitProfile = formProfile.querySelector('.form__button');
export const btnSubmitPlace = formPlace.querySelector('.form__button');

// атрибуты картинки
export const image = popupImage.querySelector('.popup__image');
export const imageTitle = popupImage.querySelector('.popup__image-title');

// ошибки форм
export const errorFieldsPlace = Array.from(formPlace.querySelectorAll('.form__input-error'));
export const inputFieldsPlace = Array.from(formPlace.querySelectorAll('.form__input'));
export const errorFieldsProfile = Array.from(formProfile.querySelectorAll('.form__input-error'));
export const inputFieldsProfile = Array.from(formProfile.querySelectorAll('.form__input'));

// словарь с селекторами и классами форм, использую при валидации форм
export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  disactiveButtonClass: 'form__button_disactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}
