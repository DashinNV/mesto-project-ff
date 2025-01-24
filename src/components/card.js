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

export { createCard, handleLike, deleteCard };