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



