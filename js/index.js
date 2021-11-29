// данные пользователя
let userName = document.querySelector('.intro__user-name');
let userOccupation = document.querySelector('.profile__occupation');

// всплывающие окна
const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
const popupImage = document.querySelector('#popup-image');

// карточки мест и шаблон
const placesList = document.querySelector('.places__items');
const placesTemplate = document.querySelector('.places__item-template').content;

// формы для отправки данных, введенных пользователем
const formPlace = document.querySelector('#form-place')
const formProfile = document.querySelector('#form-profile')
const inputNameForm = document.querySelector('#user-name');
const inputOccupationForm = document.querySelector('#user-occupation');
const inputPlaceForm = document.querySelector('#place-name');
const inputLinkForm = document.querySelector('#place-link');

// кнопки
const btnProfileEdit = document.querySelector('.intro__edit-button');
const btnAddPlace = document.querySelector('.profile__button');
const btnsClosePopup = document.querySelectorAll('.popup__button-close');

const initialCards = [
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
// генерация элементов из массива в карточки мест
initialCards.forEach(function (item) {
  placesList.append(addPlace(item))
})


// функция создания новой карточки места и диспетчера событий
function addPlace(item) {
  const newPlace = placesTemplate.cloneNode(true);
  newPlace.querySelector('.places__image').src = item.link;
  newPlace.querySelector('.places__image').alt = item.name;
  newPlace.querySelector('.places__name').textContent = item.name;
  // создаю диспетчеры событий
  newPlace.querySelector('.places__item').addEventListener('click', function (evt) {
    fillImageData(item);
    openPopup(popupImage);
  });
  newPlace.querySelector('.places__basket').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
    evt.stopPropagation(); // запрещает подниматься клику до родителя
  });
  newPlace.querySelector('.places__favorite').addEventListener('click', function (evt) {
    evt.target.classList.toggle('places__favorite_active');
    evt.stopPropagation(); // запрещает подниматься клику до родителя
  });
  return newPlace
}


// функция вставки текущих данных пользователя в форму
function fillUserData() {
  inputNameForm.value = userName.textContent;
  inputOccupationForm.value = userOccupation.textContent;
}

function fillImageData(item) {
  popupImage.querySelector('.popup__image').src = item.link;
  popupImage.querySelector('.popup__image').alt = item.name;
  popupImage.querySelector('.popup__image-title').textContent = item.name;
}


// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  if (popup.id === 'popup-profile') {
    fillUserData();
  }
  if (popup.id == 'popup-image') {
    popupImage.classList.add('popup_darker');
  }
  if (popup.id === 'popup-place') {
    inputPlaceForm.value = '';
    inputLinkForm.value = '';
  }
}


// функция закрытия попапа-формы
function closePopup() {
  popupProfile.classList.remove('popup_opened');
  popupPlace.classList.remove('popup_opened');
  popupImage.classList.remove('popup_opened');
}


// функция отправки данных, введенных в форму
function formSubmitProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputNameForm.value;
  userOccupation.textContent = inputOccupationForm.value;
  closePopup();
}


// функция формирования данных из формы для новой карточки места
function formNewPlace(evt) {
  evt.preventDefault();
  newItem = {
    name: inputPlaceForm.value,
    link: inputLinkForm.value
  }
  placesList.append(addPlace(newItem));
  closePopup();
}


// диспетчеры событий
formPlace.addEventListener('submit', formNewPlace);
formProfile.addEventListener('submit', formSubmitProfile);
btnProfileEdit.addEventListener('click', function () {
  openPopup(popupProfile)
});
btnAddPlace.addEventListener('click', function () {
  openPopup(popupPlace)
});
// обработчики для кнопок закрытия
btnsClosePopup.forEach( function (btn) {
  btn.addEventListener('click', closePopup);
})
