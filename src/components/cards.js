const cardTemplate = document.querySelector('#card-template').content;
const cardTemplateElement = cardTemplate.querySelector('.places__item');

// Функция создания карточки
function createCard({name, link}, deleteCard, handleLike, openImage) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__title').textContent = name;
  const cardImage = cardElement.querySelector(".card__image")
  cardImage.src = link;  
  cardImage.alt = name; 
  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', () => handleLike(likeButton));
  cardImage.addEventListener('click', () => openImage(name, link));
  return cardElement;
}

// функция обработки клика на лайк
function handleLike(button) {
  button.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
function deleteCard (event) {
  event.target.closest('.places__item').remove()
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

export { createCard, handleLike, deleteCard, initialCards };