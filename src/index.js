import "./pages/index.css";
import { createCard, handleLike, deleteCard, initialCards } from "./components/cards";
import { openPopup, closePopup, handleEscKey} from "./components/modal";

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

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
export const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close');

// Добавляем обработчики событий для открытия модальных окон
editProfileBtn.addEventListener('click', () => {
  fillProfileForm();
  openPopup(popupEdit);
});
newCardBtn.addEventListener('click', () => openPopup(popupNewCard));

// Редактирование профиля
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const nameInput = popupEditProfile.querySelector('input[name="name"]'); 
export const jobInput = popupEditProfile.querySelector('input[name="description"]');
const popupImageContainer = document.querySelector(".popup_type_image");
const popupCaption = popupImageContainer.querySelector(".popup__caption");

function handleFormProfileSubmit(evt) {
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

popupEditProfile.addEventListener('submit', handleFormProfileSubmit);
 
// функция для заполнения формы профиля
function fillProfileForm() {
    const userName = document.querySelector('.profile__title').textContent;
    const userDescription = document.querySelector('.profile__description').textContent;
    nameInput.value = userName;
    jobInput.value = userDescription;
  }

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
  formAdd.reset();
}

formAdd.addEventListener('submit', createNewCard);

// функция открытия изображения
function openImage(name, link) {
    // Устанавливаем источник и альтернативный текст для попапа с изображением
    const popupImageElement = popupImage.querySelector(".popup__image");
    popupImageElement.src = link;
    popupImageElement.alt = name; // Устанавливаем alt для улучшения доступности
    popupCaption.textContent = name; // Устанавливаем текст заголовка
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