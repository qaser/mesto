import * as constant from '../js/utils/constants.js';
import Card from '../js/components/Card.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/api/Api.js';
import Popup from '../js/components/Popup.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import Section from '../js/components/Section.js';
import FormValidator from '../js/components/FormValidator.js';


const formValidators = {};


const api = new Api({
  baseUrl: constant.apiConfig.url,
  headers: {
    authorization: constant.apiConfig.token,
    'Content-Type': 'application/json'
  }
});


function createCard(item) {
  const card = new Card(api, item, handleCardClick, '.places__item-template');
  const cardElement = card.generateCard();
  return cardElement;
}


// функция формирование первоначальных карточек мест
function getCards() {
  api.getInitialCards()
    .then((cards) => {
      const cardList = new Section({
        items: cards,
        renderer: (item) => {
          const newCard = createCard(item);
          cardList.setItem(newCard);
        },
      },
      '.places__items');
      cardList.renderItems();
    })
    .catch(err => {
      console.log(err)
    });
}

getCards(); // первоначальная загрузка карточек с сервера


// создание объекта всплывающего окна с изображением
const popupImage = new PopupWithImage('#popup-image');
popupImage.setEventListeners();


function handleCardClick(name, link) {
  popupImage.open(name, link);
}


// создание объекта всплывающего окна с формой добавления карточки места
const popupWithFormPlace = new PopupWithForm('#popup-place', '#form-place', (data) => {
  submitFormPlace(data);
});
popupWithFormPlace.setEventListeners();


// создание объекта всплывающего окна с формой редактирования пользователя
const popupWithFormProfile = new PopupWithForm('#popup-profile', '#form-profile', (data) => {
  submitFormProfile(data);
});
popupWithFormProfile.setEventListeners();


// создание объекта всплывающего окна с формой подтверждения удаления карточки
const popupWithFormAvatar = new PopupWithForm('#popup-avatar', '#form-avatar', (data) => {
  submitFormAvatar(data);
});
popupWithFormAvatar.setEventListeners();


// универсальная функция для валидации форм (доступ по имени формы)
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(constant.config);


// создание объекта с данными пользователя
const newUserInfo = new UserInfo({
  name: '.intro__user-name',
  occupation: '.profile__occupation',
  avatar: '.profile__avatar',
});


// первичное заполнение данных пользователя
api.getUser()
  .then((userData) => {
    newUserInfo.setUserInfo(userData.name, userData.about);
    newUserInfo.setUserAvatar(userData.avatar);
  })


// функция отправки данных из формы для новой карточки места
function submitFormPlace(data) {
  const newItem = {
    name: data.place,
    link: data.link,
    likes: [], // изначально лайков нет (пустой список)
  };
  api.addNewCard(newItem) // отправка запроса на сервер
  getCards(); // получение данных с сервера
  popupWithFormPlace.close();
}


// функция отправки данных, введенных в форму
function submitFormProfile(data) {
  newUserInfo.setUserInfo(data.name, data.occupation);
  popupWithFormProfile.close();
}


// функция отправки данных, введенных в форму
function submitFormAvatar(data) {
  newUserInfo.setUserAvatar(data.avatar);
  popupWithFormAvatar.close();
}


// функция вставки текущих данных пользователя в форму
function fillUserData() {
  constant.inputNameForm.value = newUserInfo.getUserInfo().name;
  constant.inputOccupationForm.value = newUserInfo.getUserInfo().occupation;
}


// слушатель кнопки редактирования пользовательских данных
constant.btnProfileEdit.addEventListener('click', () => {
  fillUserData();
  formValidators['edit-user'].resetValidation()
  popupWithFormProfile.open();
});

// слушатель кнопки добавления новой карточки места
constant.btnAddPlace.addEventListener('click', () => {
  formValidators['add-place'].resetValidation()
  popupWithFormPlace.open();
});

// слушатель кнопки изменения аватара
constant.btnAvatarEdit.addEventListener('click', () => {
  formValidators['add-avatar'].resetValidation()
  popupWithFormAvatar.open();
});
