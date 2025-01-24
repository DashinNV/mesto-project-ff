import { popupEdit, popupEditProfile, nameInput, jobInput } from '../index';

// Обработчик нажатия клавиши Esc
function handleEscKey(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

// Функция для открытия модальных окон
function openPopup(popup) {
  popup.classList.remove('popup_is-animated'); // Убираем класс анимации
  popup.classList.add('popup_is-opened'); // Добавляем класс для открытия
  document.addEventListener('keydown', handleEscKey); // Добавляем обработчик
}

// Функция для закрытия модальных окон
function closePopup(popup) {
  popup.classList.remove('popup_is-opened'); // Убираем класс для скрытия
  popup.classList.add('popup_is-animated'); // Добавляем класс для анимации скрытия
  document.removeEventListener('keydown', handleEscKey); // Удаляем обработчик
}

// Функция закрытия модальных окон при клике вне их области
function closePopupByOverlay(event) {
  if (event.target.classList.contains('popup')) { 
   closePopup(event.target); 
 }
}

export { openPopup, closePopup, closePopupByOverlay, handleEscKey };
