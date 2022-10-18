class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }

  setProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  getUsersMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }

  postMovie(data) {
    const body = JSON.parse(JSON.stringify(data));
    delete body.favorite;
    delete body._id;
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkResponse);
  }
}

export const api = new MainApi({
  // baseUrl: 'https://api.ales.movies.nomoredomains.icu',
  baseUrl: 'http://localhost:3000',
});