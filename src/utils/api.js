const API_URL = "https://norma.nomoreparties.space/api";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredientsFromServer() {
  return fetch(`${API_URL}/ingredients`).then(checkReponse);
}

export function putAnOrder() {
  return fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ['60d3b41abdacab0026a733c6']
    }),
  })
  .then(checkReponse)
}


