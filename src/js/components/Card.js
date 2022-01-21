export default class Card {
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
    this._elementBasket.addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });
    this._elementFavor.addEventListener('click', (evt) => {
      this._handleFavoriteCard(evt);
    });
  }

  _handleDeleteCard(evt) {
    this._element.remove();
    this._element = null;
    evt.stopPropagation(); // запрещает подниматься клику до родителя
  }

  _handleFavoriteCard(evt) {
    this._elementFavor.classList.toggle('places__favorite_active');
    evt.stopPropagation();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.places__image');
    this._elementFavor = this._element.querySelector('.places__favorite');
    this._elementBasket = this._element.querySelector('.places__basket');
    this._elementName = this._element.querySelector('.places__name');
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;
    return this._element
  }
}
