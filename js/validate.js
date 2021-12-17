// функция для отображения ошибки инпута формы
function showInputError(formElement, inputElement, errorMessage, dict) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(dict.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dict.errorClass);
}

// функция для скрытия ошибки инпута формы
function hideInputError(formElement, inputElement, dict) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(dict.inputErrorClass);
  errorElement.classList.remove(dict.errorClass);
  errorElement.textContent = '';
}

// функция проверки валидности поля формы
function checkInputValidity(formElement, inputElement, dict) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, dict);
  } else {
    hideInputError(formElement, inputElement, dict);
  }
}

// функция установки слушателя на все инпуты формы
function setEventListeners(formElement, dict) {
  const inputList = Array.from(formElement.querySelectorAll(dict.inputSelector));
  const buttonElement = formElement.querySelector(dict.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, dict);
  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement, dict);
    toggleButtonState(inputList, buttonElement, dict);
  });
});
}

// функция проверки валидности всех инпутов
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// функция переключения активности кнопки
function toggleButtonState(inputList, buttonElement, dict) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(dict.disactiveButtonClass);
  }
  else {
    buttonElement.classList.remove(dict.disactiveButtonClass);
  }
}

// функция установки слушателя на все формы страницы
function enableValidation(dict) {
  const formList = Array.from(
    document.querySelectorAll(dict.formSelector)
  );
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    setEventListeners(formElement, dict);
});
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  disactiveButtonClass: 'form__button_disactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
});
