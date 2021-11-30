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


// генерация элементов из массива в карточки мест
initialCards.forEach(function (item) {
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
  newPlace.querySelector('.places__item').addEventListener('click', function (evt) {
    fillImageData(item);
    openPopup(popupImage);
    popupImage.classList.add('popup_darker');
  });
  newPlace.querySelector('.places__basket').addEventListener('click', function (evt) {
    evt.target.closest('.places__item').remove();
    evt.stopPropagation(); // запрещает подниматься клику до родителя
  });
  newPlace.querySelector('.places__favorite').addEventListener('click', function (evt) {
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
  const image = popupImage.querySelector('.popup__image')
  image.src = item.link;
  image.alt = item.name;
  popupImage.querySelector('.popup__image-title').textContent = item.name;
}


// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}


// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// функция отправки данных, введенных в форму
function submitFormProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputNameForm.value;
  userOccupation.textContent = inputOccupationForm.value;
  closePopup(popupProfile);
}


// функция формирования данных из формы для новой карточки места
function submitFormPlace(evt) {
  evt.preventDefault();
  let imageLink = inputLinkForm.value;
  // обработка отправки пустой формы
  if (imageLink === '') {
    imageLink = '../images/error.jpg';
  };
  const newItem = {
    name: inputPlaceForm.value,
    link: imageLink
  };
  placesList.insertBefore(createCard(newItem), placesList.firstChild);
  closePopup(popupPlace);
}


// диспетчеры событий
formPlace.addEventListener('submit', submitFormPlace);
formProfile.addEventListener('submit', submitFormProfile);
btnProfileEdit.addEventListener('click', function () {
  openPopup(popupProfile);
  fillUserData();
});
btnAddPlace.addEventListener('click', function () {
  openPopup(popupPlace);
  inputPlaceForm.value = '';
  inputLinkForm.value = '';
});
// обработчики для кнопок закрытия
btnsClosePopup.forEach( function (btn) {
  const popup = btn.closest('.popup')
  btn.addEventListener('click', function () {
    closePopup(popup)
  });
});
