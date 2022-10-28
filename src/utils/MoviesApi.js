export default function getAllMovies() {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.json)
    });
}
