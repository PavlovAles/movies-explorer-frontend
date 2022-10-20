import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import LoginRegister from '../LoginRegister/LoginRegister';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import { api } from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import getAllMovies from '../../utils/MoviesApi';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteFilteredMovies, setFavoriteFilteredMovies] = useState([]);
  const [filter, setFilter] = useState('');
  const [findShorts, setFindShorts] = useState(false);
  const [status, setStatus] = useState('success');
  const { pathname } = useLocation();

  const history = useHistory();

  const showHeader = (
    pathname === '/' ||
    pathname === '/movies' ||
    pathname === '/saved-movies' ||
    pathname === '/profile'
  );

  const showFooter = (
    pathname === '/' ||
    pathname === '/movies' ||
    pathname === '/saved-movies'
  );

  async function getAndSetMovies() {
    setStatus('loading');
    try {
      let [allMovies, favoriteMovies] = await Promise.all([getAllMovies(), api.getUsersMovies()]);
      favoriteMovies = favoriteMovies.data.map(movie => ({ ...movie, favorite: true }));
      allMovies = allMovies.map(movie => {
        const favoriteCard = favoriteMovies.find(favoriteMovie => favoriteMovie.movieId === movie.id);
        return {
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: 'https://api.nomoreparties.co/' + movie.image.url,
          trailerLink: movie.trailerLink,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: 'https://api.nomoreparties.co/' + movie.image.formats.thumbnail.url,
          movieId: movie.id,
          favorite: favoriteCard !== undefined,
          _id: favoriteCard ? favoriteCard._id : null,
        }
      });
      setStatus('success')
      setMovies(allMovies);
      setFavoriteMovies(favoriteMovies);
      setFavoriteFilteredMovies(favoriteMovies);
    } catch (err) {
      console.log(err);
      setStatus('error');
    }
  };

  useEffect(() => {
    handleTokenCheck();
    getAndSetMovies();
  }, []);

  //user
  function handleTokenCheck() {
    if (!localStorage.getItem('jwt')) {
      return;
    }
    const jwt = localStorage.getItem('jwt');
    auth
      .checkToken(jwt)
      .then((res) => {
        setCurrentUser(res.data);
        setLoggedIn(true);
        getAndSetMovies();
        history.push('/saved-movies');
      })
      .catch((err) => {
        err.then((err) => {
          console.log(err);
        });
      });
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data?.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          handleTokenCheck();
        }
      })
      .catch((errJson) => {
        errJson.then((err) => {
          console.log(`Error: ${err.message}`);
        });
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser({
      name: '',
      email: '',
    });
    localStorage.removeItem('jwt');
  }

  function handleRegistration(name, password, email) {
    auth
      .register(name, password, email)
      .then((res) => {
        history.push('/signin');
      })
      .catch((err) => {
        err.then((err) => {
          console.log(err);
        });
      });
  }

  function handleUserUpdate(userInfo) {
    api
      .setProfile(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
      })
      .catch((err) => {
        err.then((err) => {
          console.log(err.message);
        });
      });
  }

  //movies
  function filterMovies(collection, setCollection, filter) {
      const filteredCollection = collection.filter(movie => {
        return movie.nameRU.toLowerCase().includes(filter);
      })
      setCollection(filteredCollection);
  }

  function setNewFilter(filter) {
    setFilter(filter);
    if (pathname === '/movies') {
      filterMovies(movies, setFilteredMovies, filter);
      return;
    }
    filterMovies(favoriteMovies, setFavoriteFilteredMovies, filter);
  }

  function clearFileredMovies() {
    setFilteredMovies([]);
    setFilter('');
  }

  function handleLikeClick(clickedMovie) {
    if (!clickedMovie.favorite) {
      api
        .postMovie(clickedMovie)
        .then((newMovie) => {
          newMovie = { ...newMovie.data, favorite: true };
          setMovies(state => {
            const newState = state.map((movie) => (movie.movieId === newMovie.movieId) ? newMovie : movie);
            filterMovies(newState, setFilteredMovies, filter);
            return newState;
          });
          setFavoriteMovies(state => {
            const newState = [...state, newMovie];
            filterMovies(newState, setFavoriteFilteredMovies, filter);
            return newState;
          });
        })
        .catch((errJson) => {
          errJson.then((err) => {
            console.log(err.message);
          });
        });
    } else {
      api
        .deleteMovie(clickedMovie._id)
        .then(() => {
          setMovies(state => {
            const newState = state.map((movie) => {
              return (movie.movieId !== clickedMovie.movieId) ?
                movie :
                { ...movie, _id: null, favorite: false };
            })
            filterMovies(newState, setFilteredMovies, filter);
            return newState;
          });
          setFavoriteMovies(state => {
            const newState = state.filter(movie => movie.movieId !== clickedMovie.movieId);
            filterMovies(newState, setFavoriteFilteredMovies, filter);
            return newState;
          });
        })
        .catch((errJson) => {
          errJson.then((err) => {
            console.log(err.message);
          });
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {showHeader && <Header authorized={loggedIn} onLinkClick={clearFileredMovies} />}
        <main>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route path='/movies'>
              <Movies
                movies={filteredMovies}
                status={status}
                onSearch={setNewFilter}
                onToggleClick={() => setFindShorts(!findShorts)}
                onLikeClick={handleLikeClick}
              />
            </Route>
            <Route path='/saved-movies'>
              <SavedMovies
                movies={favoriteFilteredMovies}
                status={status}
                onSearch={setNewFilter}
                onToggleClick={() => setFindShorts(!findShorts)}
                onLikeClick={handleLikeClick}
              />
            </Route>
            <Route path='/profile'>
              <Profile
                user={currentUser}
                onSubmit={handleUserUpdate}
                onLogout={handleLogout}
              />
            </Route>
            <Route path='/signin'>
              <LoginRegister
                type='signin'
                formName='signin'
                title='Рады видеть!'
                submitText='Войти'
                onSubmit={handleLogin}
              />
            </Route>
            <Route path='/signup'>
              <LoginRegister
                type='signup'
                formName='signup'
                title='Добро пожаловать!'
                submitText='Зарегистрироваться'
                onSubmit={handleRegistration}
              />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        {showFooter && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
