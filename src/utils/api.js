const API_URL = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredientsFromServer() {
  return fetch(`${API_URL}/ingredients`)
   .then(checkReponse)
}
