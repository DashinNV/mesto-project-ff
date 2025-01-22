import { popupEdit, formElement, nameInput, jobInput } from '../index';

// Функции для открытия модальных окон
function openPopup(popup) {
  // Заполняем поля формы значениями, которые отображаются на странице
  if (popup === popupEdit) {
    const userName = document.querySelector('.profile__title').textContent;
    const userDescription = document.querySelector('.profile__description').textContent;
    nameInput.value = userName;
    jobInput.value = userDescription;
  }
  popup.classList.remove('popup_is-animated'); // Убираем класс анимации
  popup.classList.add('popup_is-opened'); // Добавляем класс для открытия
  // Добавляем обработчик нажатия клавиши Esc
  document.addEventListener('keydown', handleEscKey(popup));
}

// Функции для закрытия модальных окон
function closePopup(popup) {
  popup.classList.remove('popup_is-opened'); // Убираем класс для скрытия
  popup.classList.add('popup_is-animated'); // Добавляем класс для анимации скрытия
  // Удаляем обработчик нажатия клавиши Esc
  document.removeEventListener('keydown', handleEscKey(popup));
}

// Обработчик нажатия клавиши Esc
function handleEscKey(popup) {
  return function(event) {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  }
}

export { openPopup, closePopup, handleEscKey };
