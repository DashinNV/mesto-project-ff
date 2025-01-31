// Функция для получения элемента ошибки по полю ввода
function getErrorElement(inputField, validationConfig) {
  return inputField
    .closest(validationConfig.formSelector)
    .querySelector(`.popup__input_type_error-${inputField.name}`);
}

// Функция для отображения сообщения об ошибке валидации
function showError(inputField, errorMessage, validationConfig) {
  const errorElement = getErrorElement(inputField, validationConfig);
  inputField.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
}

// Функция для скрытия сообщения об ошибке валидации
function hideError(inputField, validationConfig) {
  const errorElement = getErrorElement(inputField, validationConfig);
  inputField.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
}

// Функция для проверки валидации полей ввода
function checkInputValidity(inputField, validationConfig) {
  if (inputField.validity.valueMissing) {
    showError(inputField, errorMessage, validationConfig);
    return false;
  }
  if (inputField.validity.patternMismatch) {
    inputField.setCustomValidity(inputField.dataset.error);
  } else { 
    inputField.setCustomValidity("");
  }
  if (inputField.validity.valid) {
    hideError(inputField, validationConfig);
  } else {
    showError(inputField, inputField.validationMessage, validationConfig);
  }
  return inputField.validity.valid;
}

// Функция для установки обработчиков событий валидации
function setEventListeners(form, validationConfig) {
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);
  form.addEventListener("input", (event) => {
    const inputField = event.target;
    const formIsValid = form.checkValidity();
    checkInputValidity(inputField, validationConfig);
    toggleButtonState(formIsValid, submitButton, validationConfig);
  });
  form.addEventListener("reset", () => clearValidation(form, validationConfig));
}

// Функция для подключения валидации ко всем формам на странице
function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);
  forms.forEach((form) => setEventListeners(form, validationConfig));
}

// Функция для переключения состояния кнопки в зависимости от валидности
function toggleButtonState(isValid, button, validationConfig) {
  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  }
}

// Функция сброса валидации формы
function clearValidation(form, validationConfig) {
  const inputFields = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);
  inputFields.forEach((inputField) => hideError(inputField, validationConfig));
  toggleButtonState(false, submitButton, validationConfig);
}

export {enableValidation, clearValidation};