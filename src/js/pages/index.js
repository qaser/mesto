import * as constant from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import {
  FormValidator,
  buttonActive,
  buttonPassive
} from '../components/FormValidator.js';


// формирование первоначальных карточек мест
const cardList = new Section({
  items: constant.initialCards,
  renderer: (item) => {
    const card = new Card(item, handleCardClick, '.places__item-template');
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  },
},
'.places__items');
cardList.renderItems();


// создание объекта всплывающего окна с изображением
const popupImage = new PopupWithImage('#popup-image');
popupImage.setEventListeners();

function handleCardClick(name, link) {
  popupImage.open(name, link);
}


// создание объекта всплывающего окна с формой добавления карточки места
const popupWithFormPlace = new PopupWithForm('#popup-place', '#form-place', (data) => {
  submitFormPlace(data)
});
popupWithFormPlace.setEventListeners();


// создание объекта всплывающего окна с формой редактирования пользователя
const popupWithFormProfile = new PopupWithForm('#popup-profile', '#form-profile', (data) => {
  submitFormProfile(data)
});
popupWithFormProfile.setEventListeners();


// создание валидаторов форм
constant.formList.forEach((formElement) => {
  const formValidator = new FormValidator(constant.config, formElement);
  formValidator.enableValidation();
})


// создание объекта с данными пользователя
const newUserInfo = new UserInfo({
  name: '.intro__user-name',
  occupation: '.profile__occupation',
});


// функция отправки данных из формы для новой карточки места
function submitFormPlace(data) {
  const newItem = {
    name: data.place,
    link: data.link
  }
  const _card = new Card(newItem, handleCardClick, '.places__item-template');
  const _cardElement = _card.generateCard()
  cardList.setItemFront(_cardElement);
  popupWithFormPlace.close();
}


// функция отправки данных, введенных в форму
function submitFormProfile(data) {
  newUserInfo.setUserInfo(data.name, data.occupation);
  popupWithFormProfile.close();
}


// функция вставки текущих данных пользователя в форму
function fillUserData() {
  constant.inputNameForm.value = newUserInfo._name.textContent;
  constant.inputOccupationForm.value = newUserInfo._occupation.textContent;
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


// слушатель кнопки редактирования пользовательских данных
constant.btnProfileEdit.addEventListener('click', () => {
  resetErrorsForm(constant.errorFieldsProfile, constant.inputFieldsProfile);
  fillUserData();
  buttonActive(constant.btnSubmitProfile, 'form__button_disactive') // активация кнопки
  popupWithFormProfile.open();
});

// слушатель кнопки добавления новой карточки места
constant.btnAddPlace.addEventListener('click', () => {
  resetErrorsForm(constant.errorFieldsPlace, constant.inputFieldsPlace);
  buttonPassive(constant.btnSubmitPlace, 'form__button_disactive') // кнопка пассивна
  popupWithFormPlace.open();
});
