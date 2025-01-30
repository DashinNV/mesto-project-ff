// Ссылка на API и токен
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-30',
  headers: {
    authorization: 'a42ea3a8-145d-420b-9019-ee7e669e790a',
    "Content-Type": "application/json",
  }
}

// Проверка ответа сервера
const checkingResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => checkingResponse(res));
}

// Отправка новой карточки на сервер
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
  })
    .then((res) => checkingResponse(res)); 
}

// Удаление текущей карточки на сервере
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => checkingResponse(res));
}

// Загрузка профиля с сервера
export const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => checkingResponse(res));
}

// Отправка данных профиля на сервер
export const editProfileData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
    .then((res) => checkingResponse(res));
}

// Лайк текущей карточки
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => checkingResponse(res));
}

// Дизлайк текущей карточки
export const dislikeCard = (cardId)  => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => checkingResponse(res));
}

// Отправка на сервер обновленого аватара
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  })
    .then((res) => checkingResponse(res));
}