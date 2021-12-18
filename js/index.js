import {initialCards} from './fixture.js';

// данные пользователя
const userName = document.querySelector('.intro__user-name');
const userOccupation = document.querySelector('.profile__occupation');

// всплывающие окна
const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
const popupImage = document.querySelector('#popup-image');

// карточки мест и шаблон
const placesList = document.querySelector('.places__items');
const placesTemplate = document.querySelector('.places__item-template').content;

// формы для отправки данных, введенных пользователем
const formPlace = document.querySelector('#form-place');
const formProfile = document.querySelector('#form-profile');
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

// генерация элементов из массива в карточки мест
initialCards.forEach((item) => {
  placesList.append(createCard(item));
});


// функция создания новой карточки места и диспетчера событий
function createCard(item) {
  const newPlace = placesTemplate.cloneNode(true);
  const placeImage = newPlace.querySelector('.places__image')
  placeImage.src = item.link;
  placeImage.alt = item.name;
  newPlace.querySelector('.places__name').textContent = item.name;
  // создаю диспетчеры событий
  newPlace.querySelector('.places__item').addEventListener('click', (evt) => {
    fillImageData(item);
    openPopup(popupImage);
    popupImage.classList.add('popup_darker');
  });
  newPlace.querySelector('.places__basket').addEventListener('click', (evt) => {
    evt.target.closest('.places__item').remove();
    evt.stopPropagation(); // запрещает подниматься клику до родителя
  });
  newPlace.querySelector('.places__favorite').addEventListener('click', (evt) => {
    evt.target.classList.toggle('places__favorite_active');
    evt.stopPropagation(); // запрещает подниматься клику до родителя
  });
  return newPlace;
}


// функция вставки текущих данных пользователя в форму
function fillUserData() {
  inputNameForm.value = userName.textContent;
  inputOccupationForm.value = userOccupation.textContent;
}


// функция заполнения аттрибутов картинки в тег <img>
function fillImageData(item) {
  image.src = item.link;
  image.alt = item.name;
  imageTitle.textContent = item.name;
}


// функция открытия попапа
function openPopup(popup) {
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
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (evt) => {
    closeByEscape(evt, popup);
  })
  popup.removeEventListener('click', (evt) => {
    closeByOverlay(evt, popup);
  })
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
  placesList.prepend(createCard(newItem));
  closePopup(popupPlace);
}


// сброс сообщений валидации и стиля полей
function resetErrorsForm(form) {
  const errorFields = Array.from(form.querySelectorAll('.form__input-error'));
  const inputFields = Array.from(form.querySelectorAll('.form__input'));
  errorFields.forEach((field) => {
    field.textContent = '';
  });
  inputFields.forEach((field) => {
    field.classList.remove('form__input_invalid');
  })
}


// диспетчеры событий
formPlace.addEventListener('submit', submitFormPlace);
formProfile.addEventListener('submit', submitFormProfile);
btnProfileEdit.addEventListener('click', () => {
  resetErrorsForm(formProfile);
  fillUserData();
  btnSubmitProfile.disabled = false;
  btnSubmitProfile.classList.remove('form__button_disactive');
  openPopup(popupProfile);
});
btnAddPlace.addEventListener('click', () => {
  formPlace.reset(); // очистка ранее введенных данных в инпутах
  resetErrorsForm(formPlace);
  btnSubmitPlace.disabled = true; // защита от введения пустых данных
  btnSubmitPlace.classList.add('form__button_disactive');
  openPopup(popupPlace);
});
// обработчики для кнопок закрытия
btnsClosePopup.forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => {
    closePopup(popup);
  });
});
