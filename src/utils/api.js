const API_URL = "https://norma.nomoreparties.space/api";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredientsFromServer() {
  return fetch(`${API_URL}/ingredients`).then(checkReponse);
}

export function putAnOrder(id) {
  return fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: id
    }),
  })
  .then(checkReponse)
}

export function passwordReset(email) {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email
    }),
  })
  .then(checkReponse)
}

export function createUser(email, password, name) {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  .then(checkReponse)
}

export function logInItoAccount(email, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  .then(checkReponse)
}

export function logOutFromAccount(refreshToken) {
  return fetch(`${API_URL}/auth/logout `, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: { refreshToken }
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  .then(checkReponse)
}
