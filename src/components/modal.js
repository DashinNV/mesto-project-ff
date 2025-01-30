
// Обработчик нажатия клавиши Esc
function closeByEscape(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") closePopup(openedPopup);
}

// Функция для открытия модальных окон
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

// Функция для закрытия модальных окон
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

// Функция закрытия модальных окон при клике вне их области
function closePopupByOverlay(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target.matches(".popup_is-opened, .popup__close"))
    closePopup(openedPopup);
}

export {openPopup, closePopup, closePopupByOverlay};