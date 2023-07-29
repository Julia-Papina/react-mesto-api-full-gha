function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`${res.status} ${res.statusText}`);
  }
}

//export const BASE_URL = "https://auth.nomoreparties.co";
//export const BASE_URL = "http://localhost:3000";
export const BASE_URL = "https://papina-pr15.nomoredomains.xyz";
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    // credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const tokenUser = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      //Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
};
