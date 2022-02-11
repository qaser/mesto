import * as constant from '../js/utils/constants.js';
import Card from '../js/components/Card.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/api/Api.js';
import PopupWithConfirm from '../js/components/PopupWithConfirm.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import Section from '../js/components/Section.js';
import FormValidator from '../js/components/FormValidator.js';


const formValidators = {};
let myId // переменная нужна для сохранения моего ID, использую в функции createCard

// создание объекта api
const api = new Api({
  baseUrl: constant.apiConfig.url,
  headers: {
    authorization: constant.apiConfig.token,
    'Content-Type': 'application/json'
  }
});

// экземпляр карточки
const cardInstance = new Section({
  renderer: (item) => {
    const newCard = createCard(item);
    cardInstance.setItem(newCard);
  },
},
'.places__items');

// создание объектов со всплывающими окнами
const popupImage = new PopupWithImage('#popup-image');
const popupWithFormPlace = new PopupWithForm(
  '#popup-place',
  '#form-place',
  (data) => {
    submitFormPlace(data);
  },
);
const popupWithConfirmForm = new PopupWithConfirm(
  '#popup-confirm-delete',
  '#form-delete',
  submitConfirmForm
);
const popupWithFormProfile = new PopupWithForm(
  '#popup-profile',
  '#form-profile',
  (data) => {
    submitFormProfile(data);
  },
);
const popupWithFormAvatar = new PopupWithForm(
  '#popup-avatar',
  '#form-avatar',
  (data) => {
    submitFormAvatar(data);
  },
);

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

// создание объекта с данными пользователя
const newUserInfo = new UserInfo({
  name: '.intro__user-name',
  occupation: '.profile__occupation',
  avatar: '.profile__avatar',
});


function createCard(item) {
  const card = new Card(
    api,
    myId,
    item,
    handleCardClick,
    handleCardBasketClick,
    '.places__item-template'
  );
  const cardElement = card.generateCard();
  return cardElement;
}


function handleCardClick(name, link) {
  popupImage.open(name, link);
}


function handleCardBasketClick(evt, cardId, element) {
  popupWithConfirmForm.open(cardId, element);
}


// функция вставки текущих данных пользователя в форму
function fillUserData() {
  const userData = newUserInfo.getUserInfo()
  constant.inputNameForm.value = userData.name;
  constant.inputOccupationForm.value = userData.occupation;
}


// функция отправки данных после подтверждения
function submitConfirmForm(cardId, element) {
  api.deleteCard(cardId)
  .then(() => {
    element.remove();
    element = null;
    popupWithConfirmForm.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err.status}`);
  })
}


// функция отправки данных из формы для новой карточки места
function submitFormPlace(data) {
  const newItem = {
    name: data.place,
    link: data.link,
    likes: [], // изначально лайков нет (пустой список)
  };
  popupWithFormPlace.renderLoading(true)
  api.addNewCard(newItem) // отправка запроса на сервер
    .then((card) => {
      const newCard = createCard(card);
      cardInstance.setItemFront(newCard);
      popupWithFormPlace.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    })
    .finally(() => popupWithFormPlace.renderLoading(false));
}


// функция отправки данных пользователя, введенных в форму
function submitFormProfile(data) {
  popupWithFormProfile.renderLoading(true);
  api.editMyProfile(data)
    .then((userData) => {
      newUserInfo.setUserInfo(userData);
      popupWithFormProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    })
    .finally(() => popupWithFormProfile.renderLoading(false));
}


// функция отправки данных автара, введенных в форму
function submitFormAvatar(data) {
  popupWithFormAvatar.renderLoading(true);
  api.changeAvatar(data.avatar)
    .then((userData) => {
      newUserInfo.setUserInfo(userData);
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
    })
    .finally(() => popupWithFormAvatar.renderLoading(false));
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


enableValidation(constant.config);

popupImage.setEventListeners();
popupWithFormPlace.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithConfirmForm.setEventListeners();

// промис (заполнение данных пользователя) и (функция загрузки карточек с сервера)
Promise.all([api.getMyProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    newUserInfo.setUserInfo(userData);
    myId = userData._id;
    cardInstance.renderItems(cards);
  })
  .catch(err => {
    console.log(`Ошибка: ${err.status}`);
  });
