import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, formSelector, submitConfirmForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._submitConfirmForm = submitConfirmForm;
    this._submitButton = this._form.querySelector('.form__button');
  }

  open(cardId, element) {
    this._cardId = cardId;
    this._element = element;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitConfirmForm(this._cardId, this._element);
    });
  }
}
