import "./pages/index.css";
import { createCard, handleLikeChange, deleteMyCard } from "./components/cards";
import { openPopup, closePopup, closePopupByOverlay } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import { updateAvatar, getProfileData, editProfileData, getInitialCards, addNewCard, deleteCard} from "./components/api";

// CSS-классы и id пользователя
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let profileId = null;

// DOM узлы
const placesList = document.querySelector(".places__list");

const profile = document.querySelector(".profile"),
  profileAvatarEditButton = profile.querySelector(".profile__image"),
  profileEditButton = profile.querySelector(".profile__edit-button"),
  profileTitle = profile.querySelector(".profile__title"),
  profileDescription = profile.querySelector(".profile__description"),
  profileAddButton = profile.querySelector(".profile__add-button");

const avatarForm = document.querySelector('.popup__form[name="avatar"]'),
  avatarLinkInput = avatarForm.querySelector(".popup__input_type_url");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]'),
  profileNameInput = profileForm.querySelector(".popup__input_type_name"),
  profileAboutInput = profileForm.querySelector(".popup__input_type_description");

const cardForm = document.querySelector('.popup__form[name="new-place"]'),
  cardNameInput = cardForm.querySelector(".popup__input_type_card-name"),
  cardLinkInput = cardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup"),
  popupAvatar = document.querySelector(".popup_type_edit_avatar"),
  popupAvatarButton = popupAvatar.querySelector(validationConfig.submitButtonSelector),
  popupEditProfile = document.querySelector(".popup_type_edit"),
  popupEditProfileButton = popupEditProfile.querySelector(validationConfig.submitButtonSelector),
  popupNewCard = document.querySelector(".popup_type_new-card"),
  popupNewCardButton = popupNewCard.querySelector(validationConfig.submitButtonSelector),
  popupImageContainer = document.querySelector(".popup_type_image"),
  popupImage = popupImageContainer.querySelector(".popup__image"),
  popupCaption = popupImageContainer.querySelector(".popup__caption");

// Выводим данные профиля и все карточки на страницу
Promise.all([getProfileData(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    profileId = profileData._id;
    profileAvatarEditButton.style.backgroundImage = `url(${profileData.avatar})`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    cardsData.forEach((cardData) => {
      placesList.append(createCard(cardData, profileId, handleLikeChange, removeCard, openImage));
    });
  })
  .catch((error) => console.error("Ошибка при получении профиля пользователя:", error));

// Функция изменения аватара профиле
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = popupAvatarButton.textContent;
  popupAvatarButton.textContent = "Сохранение...";
  updateAvatar(avatarLinkInput.value)
    .then((profileData) => {
      profileAvatarEditButton.style.backgroundImage = `url(${profileData.avatar})`;
      closePopup(popupAvatar);
      clearValidation(cardForm, validationConfig);
    })
    .catch((error) => console.error("Ошибка при обновлении аватара профиля:", error))
    .finally(() => (popupAvatarButton.textContent = originalButtonText));
}

// Функция изменения имени и биографии в профиле
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = popupEditProfileButton.textContent;
  popupEditProfileButton.textContent = "Сохранение...";
  editProfileData(profileNameInput.value, profileAboutInput.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closePopup(popupEditProfile);
      clearValidation(cardForm, validationConfig);
    })
    .catch((error) => console.error("Ошибка обновления данных пользователя:", error))
    .finally(() => (popupEditProfileButton.textContent = originalButtonText));
}

// Функция добавления карточки на страницу
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = popupNewCardButton.textContent;
  popupNewCardButton.textContent = "Добавление...";
  addNewCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      const newCard = createCard(cardData, profileId, handleLikeChange, removeCard, openImage);
      placesList.prepend(newCard);
      closePopup(popupNewCard);
      cardForm.reset();
      clearValidation(cardForm, validationConfig);
    })
    .catch((error) => console.error("Ошибка при добавлении карточки:", error))
    .finally(() => (popupNewCardButton.textContent = originalButtonText));
}

// Функция удаления своей карточки
function removeCard(card, cardData) {
  deleteCard(cardData._id)
    .then(() => deleteMyCard(card))
    .catch((error) => console.error("Ошибка при удалении карточки:", error));
}

// Функция открытия изображения
function openImage(cardData) {
  const newCard = cardData.closest(".card"),
    cardImage = newCard.querySelector(".card__image"),
    cardTitle = newCard.querySelector(".card__title");
  popupImage.src = cardImage.src;
  popupImage.alt = cardTitle.alt;
  popupCaption.textContent = cardTitle.textContent;
  openPopup(popupImageContainer);
}

// Исходные данные в попапах
function openEditAvatarPopup() {
  avatarLinkInput.value = profileAvatarEditButton.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/,"$1");
  openPopup(popupAvatar);
}

function openEditProfilePopup() {
  clearValidation(profileForm, validationConfig);
  profileNameInput.value = profileTitle.textContent;
  profileAboutInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

// Валидация форм
enableValidation(validationConfig);
clearValidation(avatarForm, validationConfig);
clearValidation(profileForm, validationConfig);
clearValidation(cardForm, validationConfig);


// Обработчики событий
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);
profileAvatarEditButton.addEventListener("click", () => openEditAvatarPopup());
profileEditButton.addEventListener("click", () => openEditProfilePopup());
profileAddButton.addEventListener("click", () => openPopup(popupNewCard));
popups.forEach((popup) => popup.addEventListener("mousedown", closePopupByOverlay));