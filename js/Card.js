import {fillImageData, popupImage, openPopup} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.places__item').addEventListener('click', () => {
      // здесь, мне кажется, лучше не обращаться к внешним функциям, но пока так
      fillImageData(this);
      openPopup(popupImage);
      popupImage.classList.add('popup_darker');
    });
    this._element.querySelector('.places__basket').addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });
    this._element.querySelector('.places__favorite').addEventListener('click', (evt) => {
      this._handleFavoriteCard(evt);
    });
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.places__item').remove();
    evt.stopPropagation(); // запрещает подниматься клику до родителя
  }

  _handleFavoriteCard(evt) {
    evt.target.classList.toggle('places__favorite_active');
    evt.stopPropagation();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.places__image').src = this._link;
    this._element.querySelector('.places__image').alt = this._name;
    this._element.querySelector('.places__name').textContent = this._name;
    return this._element
  }
}
