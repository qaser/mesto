export class Card {
  constructor(data, handleCardClick, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
  const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.places__item')
    .cloneNode(true);
  return cardElement;
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._element.querySelector('.places__basket').addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });
    this._element.querySelector('.places__favorite').addEventListener('click', (evt) => {
      this._handleFavoriteCard(evt);
    });
  }

  _handleDeleteCard(evt) {
    this._element.remove();
    this._element = null;
    evt.stopPropagation(); // запрещает подниматься клику до родителя
  }

  _handleFavoriteCard(evt) {
    this._element.querySelector('.places__favorite').classList.toggle('places__favorite_active');
    evt.stopPropagation();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const imageSelector = this._element.querySelector('.places__image');
    imageSelector.src = this._link;
    imageSelector.alt = this._name;
    this._element.querySelector('.places__name').textContent = this._name;
    return this._element
  }
}
