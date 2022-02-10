export default class Card {
  constructor(api, userId, data, handleCardClick, handleCardBasketClick, cardSelector) {
    this._api = api;
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._likes = data.likes; // это список пользователей, нажавших на лайк
    this._myId = userId; // мой id - нужен для отображения иконки удаления
    this._ownerId = data.owner._id;  // id создателя карточки
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardBasketClick = handleCardBasketClick;
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
      this._handleCardBasketClick(evt, this);
      evt.stopPropagation(); // запрещает подниматься клику до родителя
      // this._handleDeleteCard();
    });
    this._elementFavor.addEventListener('click', (evt) => {
      this._handleFavoriteCard(evt);
    });
  }

  _handleFavoriteCard(evt) {
    if (this._elementFavor.classList.contains('places__like_active')) {
      this._elementFavor.classList.remove('places__like_active');
      this._api.dislikeCard(this._cardId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this._elementLikes.textContent = data.likes.length;
        })
      evt.stopPropagation();
    } else {
        this._elementFavor.classList.add('places__like_active');
        this._api.likeCard(this._cardId)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this._elementLikes.textContent = data.likes.length;
          })
        evt.stopPropagation();
    }
  }

  _checkMyLike() {
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._elementFavor.classList.add('places__like_active');
      }
    })
  }

  _checkCardOwner() {
    if (this._ownerId === this._myId) {
      this._elementBasket.classList.add('places__basket_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.places__image');
    this._elementFavor = this._element.querySelector('.places__like');
    this._elementBasket = this._element.querySelector('.places__basket');
    this._elementName = this._element.querySelector('.places__name');
    this._elementLikes = this._element.querySelector('.places__like-count');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikes.textContent = this._likes.length; // длина списка лайков
    this._elementName.textContent = this._name;
    this._setEventListeners();
    this._checkMyLike();
    this._checkCardOwner();
    return this._element;
  }
}
