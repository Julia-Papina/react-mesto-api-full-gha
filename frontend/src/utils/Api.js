class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  addCard(inputsValues) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: inputsValues.name,
        link: inputsValues.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  // baseUrl: "http://localhost:3000",
  baseUrl: "https://api.papina-pr15.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Credentials': 'true',
  },
});

export default api;
