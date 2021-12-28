export class FormValidator {
  constructor(dict, formElement) {
    this._dict = dict;
    this._formElement = formElement;
  }

  // метод установки слушателя на все инпуты формы
  _setEventListeners(dict, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(dict.inputSelector));
    const buttonElement = formElement.querySelector(dict.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, dict);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, dict);
        this._toggleButtonState(inputList, buttonElement, dict);
      });
    });
  }

  // метод переключения активности кнопки
  _toggleButtonState(inputList, buttonElement, dict) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(dict.disactiveButtonClass);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(dict.disactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // метод проверки валидности всех инпутов
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // метод для отображения ошибки инпута формы
  _showInputError(formElement, inputElement, errorMessage, dict) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(dict.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(dict.errorClass);
  }

  // метод для скрытия ошибки инпута формы
  _hideInputError(formElement, inputElement, dict) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(dict.inputErrorClass);
    errorElement.classList.remove(dict.errorClass);
    errorElement.textContent = '';
  }

  // метод проверки валидности поля формы
  _checkInputValidity(formElement, inputElement, dict) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, dict);
    } else {
      this._hideInputError(formElement, inputElement, dict);
    }
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._dict, this._formElement);
  }
}
