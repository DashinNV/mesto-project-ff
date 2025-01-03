// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardTemplateElement = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки
function createCard({name, link}, deleteCard) {
    const cardElement = cardTemplateElement.cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = name;
    const cardImage = cardElement.querySelector(".card__image")
    cardImage.src = link;  
    cardImage.alt = name; 
    deleteButton.addEventListener('click', deleteCard);
  
    return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard (event) {
    event.target.closest('.places__item').remove()
};

// @todo: Вывести карточки на страницу
function renderCards() {
    initialCards.forEach(({name,link}) => {
        const card = createCard({name, link}, deleteCard);
        placesList.append(card);
    })
};

renderCards();






