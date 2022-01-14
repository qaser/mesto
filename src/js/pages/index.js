import {
  initialCards,
  placesList,
  formList,
  config,
  formPlace,
  formProfile,
  btnProfileEdit,
  btnAddPlace,
  btnsClosePopup
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js'
import { FormValidator, buttonActive, buttonPassive } from '../components/FormValidator.js'

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.places__item-template');
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, '.places__items');

cardList.renderItems();


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
