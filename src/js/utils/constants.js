import '../../pages/index.css';

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-35',
  token: '2918e5e1-ec7f-40fa-9e65-9ce4b0a59553',
}

// формы для отправки данных, введенных пользователем
const formPlace = document.querySelector('#form-place');
const formProfile = document.querySelector('#form-profile');
export const inputNameForm = document.querySelector('#user-name');
export const inputOccupationForm = document.querySelector('#user-occupation');

// кнопки
export const btnAvatarEdit = document.querySelector('.profile__button-avatar');
export const btnProfileEdit = document.querySelector('.intro__edit-button');
export const btnAddPlace = document.querySelector('.profile__button');
export const btnSubmitProfile = formProfile.querySelector('.form__button');
export const btnSubmitPlace = formPlace.querySelector('.form__button');

// словарь с селекторами и классами форм, использую при валидации форм
export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  disactiveButtonClass: 'form__button_disactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}
