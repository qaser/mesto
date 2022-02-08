//TODO при формировании карточек сделать проверку на наличие
// id пользователя в массиве like, на основании этого закрасить сердечко
// изменить _myId - брать его из апишки.
//

export default class Card {
  constructor(api, data, handleCardClick, cardSelector) {
    this._api = api;
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._likes = data.likes.length; // длина списка пользователей, нажавших на лайк
    this._myId = 'ef469de0ef13c5976c54e6c4'; // мой id - нужен для отображения иконки удаления
    this._ownerId = data.owner._id;  // id создателя карточки
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
    this._elementFavor.classList.toggle('places__like_active');
    this._api.likeCard(this._cardId);
    evt.stopPropagation();
  }

  // _updateCard(cardId) {
  //   this._api.
  // }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.places__image');
    this._elementFavor = this._element.querySelector('.places__like');
    this._elementBasket = this._element.querySelector('.places__basket');
    this._elementName = this._element.querySelector('.places__name');
    this._elementLikes = this._element.querySelector('.places__like-count');
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikes.textContent = this._likes;
    this._elementName.textContent = this._name;
    if (this._ownerId === this._myId) {
      this._elementBasket.classList.add('places__basket_active');
    }
    return this._element;
  }
}
