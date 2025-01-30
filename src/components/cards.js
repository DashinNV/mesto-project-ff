import {deleteCard, likeCard, dislikeCard} from "./api";

// Функция создания карточки
function createCard(cardData, profileId, handleLike, deleteCard, openImage) {
  const cardTemplate = document.querySelector("#card-template").content,
    card = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = card.querySelector(".card__image"),
    cardTitle = card.querySelector(".card__title"),
    cardLikeButton = card.querySelector(".card__like-button"),
    cardLikeCounter = card.querySelector(".card__like-counter"),
    isLiked = cardData.likes.some((likeItem) => likeItem._id === profileId),
    deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === profileId) deleteButton.style.display = "block";
  else deleteButton.style.display = "none";

  if (isLiked) cardLikeButton.classList.add("card__like-button_is-active");
  else cardLikeButton.classList.remove("card__like-button_is-active");

  deleteButton.addEventListener("click", () => deleteCard(card, cardData));
  cardLikeButton.addEventListener("click", () => handleLike(card, cardData));
  cardImage.addEventListener("click", () => openImage(card));
  
  return card;
}

// Функция обновления состояния лайка
function updateLikeState(cardLikeButton, cardLikeCounter, likes) {
  cardLikeCounter.textContent = likes.length;
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

// Функция обработки изменения лайка
function handleLikeChange(card, cardData) {
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");

  const action = cardLikeButton.classList.contains("card__like-button_is-active")
    ? dislikeCard
    : likeCard;

  action(cardData._id)
    .then((data) => updateLikeState(cardLikeButton, cardLikeCounter, data.likes))
    .catch((error) => console.error("Ошибка при изменении лайка:", error));
}

// Функция удаления карточки
const deleteMyCard = (card)  => card.remove();

export {createCard, handleLikeChange, deleteMyCard};
