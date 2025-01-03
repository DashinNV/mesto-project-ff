// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardTemplateElement = cardTemplate.querySelector('.places__item')

// @todo: Функция создания карточки
function addCard({name, link}, deleteCard) {
    const cardElement = cardTemplateElement.cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    deleteButton.addEventListener('click', deleteCard);
  
    return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard (event) {
    event.target.closest('.places__item').remove()
};

// @todo: Вывести карточки на страницу
function renderCard() {
    initialCards.forEach(({name,link}) => {
        const card = addCard({name, link}, deleteCard);
        placesList.append(card);
    })
};

renderCard();






