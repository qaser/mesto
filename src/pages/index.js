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

// создание объекта api
const api = new Api({
  baseUrl: constant.apiConfig.url,
  headers: {
    authorization: constant.apiConfig.token,
    'Content-Type': 'application/json'
  }
});

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
    newUserInfo._userId,
    item,
    handleCardClick,
    handleCardBasketClick,
    '.places__item-template'
  );
  const cardElement = card.generateCard();
  return cardElement;
}


// функция загрузки карточек с сервера
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


function handleCardClick(name, link) {
  popupImage.open(name, link);
}


function handleCardBasketClick(evt, card) {
  popupWithConfirmForm.open(card);
  popupWithConfirmForm.setEventListeners();
}


// заполнение данных пользователя
function myProfile() {
  api.getMyProfile()
  .then((userData) => {
    newUserInfo.setUserInfo(userData.name, userData.about);
    newUserInfo.setUserAvatar(userData.avatar);
    newUserInfo._userId = userData._id;
  })
}


// функция вставки текущих данных пользователя в форму
function fillUserData() {
  constant.inputNameForm.value = newUserInfo.getUserInfo().name;
  constant.inputOccupationForm.value = newUserInfo.getUserInfo().occupation;
}


// функция отправки данных после подтверждения
function submitConfirmForm(card) {
  api.deleteCard(card._cardId)
  .then((res) => {
    if (res.ok) {
      card._element.remove();
      card._element = null;
      popupWithConfirmForm.close();
    }
  })
  .catch((err) => {
    Promise.reject(`Ошибка: ${err.status}`);
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
    .then((res) => {
      if (res.ok) {
        getCards() // получение данных с сервера
        popupWithFormPlace.close();
      }
    })
    .catch((err) => {
      Promise.reject(`Ошибка: ${err.status}`);
    })
    .finally(popupWithFormPlace.renderLoading(false));
}


// функция отправки данных пользователя, введенных в форму
function submitFormProfile(data) {
  popupWithFormProfile.renderLoading(true);
  api.editMyProfile(data)
    .then((res) => {
      newUserInfo.setUserInfo(data.name, data.occupation);
      popupWithFormProfile.close();
    })
    .catch((err) => {
      Promise.reject(`Ошибка: ${err.status}`);
    })
    .finally(popupWithFormProfile.renderLoading(false));
}


// функция отправки данных автара, введенных в форму
function submitFormAvatar(data) {
  popupWithFormAvatar.renderLoading(true);
  api.changeAvatar(data.avatar)
    .then((res) => {
      newUserInfo.setUserAvatar(data.avatar);
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      Promise.reject(`Ошибка: ${err.status}`);
    })
    .finally(popupWithFormAvatar.renderLoading(false));
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
myProfile();
getCards(); // первоначальная загрузка карточек с сервера


popupImage.setEventListeners();
popupWithFormPlace.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormAvatar.setEventListeners();
