export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._disactiveButtonClass = config.disactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(config.inputSelector)
    );
    this._errorList = Array.from(
      this._formElement.querySelectorAll('.form__input-error')
    );
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // метод установки слушателя на все инпуты формы
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  // метод переключения активности кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.buttonPassive(buttonElement, this._disactiveButtonClass);
    }
    else {
      this.buttonActive(buttonElement, this._disactiveButtonClass);
    }
  }

  // метод проверки валидности всех инпутов
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // метод для отображения ошибки инпута формы
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // метод для скрытия ошибки инпута формы
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // метод проверки валидности поля формы
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  buttonPassive(button, buttonClass) {
    button.classList.add(buttonClass);
    button.disabled = true;
  }

  buttonActive(button, buttonClass) {
    button.classList.remove(buttonClass);
    button.disabled = false;
  }

  // сброс сообщений валидации и стиля полей
  resetErrors() {
    this._errorList.forEach((error) => {
      error.textContent = '';
    });
    this._inputList.forEach((input) => {
      input.classList.remove('form__input_invalid');
    })
  }
}
