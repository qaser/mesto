import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._submitForm = submitForm;
    this._submitButton = this._form.querySelector('.form__button');
    this._formInputs = Array.from(this._popup.querySelectorAll('.form__input'));
    this._formValues = {};
  }

  _getInputValues() {
    this._formInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      this._handleSubmitForm(evt);
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
