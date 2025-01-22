import "./pages/index.css";
import { createCard, handleLike, deleteCard, initialCards } from "./components/cards";
import { openPopup, closePopup, handleEscKey} from "./components/modal";

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
export const cardTemplateElement = cardTemplate.querySelector('.places__item');


// @todo: Вывести карточки на страницу
function renderCards() {
    initialCards.forEach(({name,link}) => {
    const card = createCard({name, link}, deleteCard, handleLike, openImage);
    placesList.append(card);
  });
}

// Получаем элементы кнопок и модальных окон
const editProfileBtn = document.querySelector('.profile__edit-button');
const newCardBtn = document.querySelector('.profile__add-button');
const imageBtn = document.querySelector('.placess__item');
export const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close');

// Добавляем обработчики событий для открытия модальных окон
editProfileBtn.addEventListener('click', () => openPopup(popupEdit));
newCardBtn.addEventListener('click', () => openPopup(popupNewCard));

// Закрытие модальных окон при клике вне их области
window.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
})

// Редактирование профиля
export const formElement = document.querySelector('.popup_type_edit');
export const nameInput = formElement.querySelector('input[name="name"]'); 
export const jobInput = formElement.querySelector('input[name="description"]');
const popupImageContainer = document.querySelector(".popup_type_image");
const popupCaption = popupImageContainer.querySelector(".popup__caption");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  const profile = document.querySelector('.profile');
  const profileTitle = profile.querySelector('.profile__title');
  const profileDescription = profile.querySelector('.profile__description');
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closePopup(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);
 
// добавление новой карточки
const formAdd = popupNewCard.querySelector('.popup__form');
const nameInputFormEdit = popupNewCard.querySelector('.popup__input_type_card-name');
const linkInputFormEdit = popupNewCard.querySelector('.popup__input_type_url');

function createNewCard(evt) {
  evt.preventDefault();
  const nameNewCard = nameInputFormEdit.value;
  const linkNewCard = linkInputFormEdit.value;
  const newCardAllDate = createCard({ name: nameNewCard, link: linkNewCard}, deleteCard, handleLike, openImage);
  placesList.prepend(newCardAllDate);
  closePopup(popupNewCard);
  nameInputFormEdit.value = "";
  linkInputFormEdit.value = "";
}

formAdd.addEventListener('submit', createNewCard);

// функция открытия изображения
function openImage(cardData) {
  const cardElement = cardData.closest(".places__item"); // Получаем элемент карточки
  const cardImage = cardElement.querySelector(".card__image"); // Получаем изображение карточки
  const cardTitle = cardElement.querySelector(".card__title"); // Получаем заголовок карточки
  // Устанавливаем источник и альтернативный текст для попапа с изображением
  const popupImageElement = popupImage.querySelector(".popup__image");
  popupImageElement.src = cardImage.src;
  popupImageElement.alt = cardTitle.textContent; // Устанавливаем alt для улучшения доступности
  popupCaption.textContent = cardTitle.textContent; // Устанавливаем текст заголовка
   // Открываем попап
    openPopup(popupImage);
}

const avatarImage = new URL('./images/avatar.jpg', import.meta.url);
const profileImageDiv = document.querySelector('.profile__image');
profileImageDiv.style.backgroundImage = `url('${avatarImage}')`;


renderCards();

// Добавляем обработчики событий для закрытия модальных окон
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  })
})