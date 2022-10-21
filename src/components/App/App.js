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
import ProtectedRoute from '../protectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState({ query: '', shorts: false });
  const [favoriteFilter, setFavoriteFilter] = useState({ query: '', shorts: false });
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
      favoriteMovies = favoriteMovies.data;
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
          _id: favoriteCard ? favoriteCard._id : null,
        }
      });
      setStatus('success')
      setMovies(allMovies);
    } catch (err) {
      console.log(err);
      setStatus('error');
    }
  };

  useEffect(() => {
    handleTokenCheck();
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
        if (localStorage.getItem('filter')) {
          setFilter(JSON.parse(localStorage.getItem('filter')));
        }
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
    setFilter({ query: '', shorts: false });
    setFavoriteFilter({ query: '', shorts: false });
    localStorage.removeItem('jwt');
    localStorage.removeItem('filter');
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
  function setNewFilter(filter) {
    setFilter(filter);
    localStorage.setItem('filter', JSON.stringify(filter));
  }

  function setNewFavoriteFilter(filter) {
    setFavoriteFilter(filter);
  }

  function filterMovies() {
    if (filter.query) {
      const filteredCollection = movies.filter(movie => {
        return movie.nameRU.toLowerCase().includes(filter.query) &&
          ((filter.shorts && movie.duration < 40) || (!filter.shorts && movie.duration > 40));
      })
      return filteredCollection;
    }
    return []
  }

  function filterFavoriteMovies() {
    const favoriteMovies = movies.filter(movie => movie._id !== null);
    if (favoriteFilter.query) {
      const filteredCollection = favoriteMovies.filter(movie => {
        return movie.nameRU.toLowerCase().includes(favoriteFilter.query) &&
          ((favoriteFilter.shorts && movie.duration < 40) || (!favoriteFilter.shorts && movie.duration > 40));
      })
      return filteredCollection;
    }
    return favoriteMovies;
  }

  function handleLikeClick(clickedMovie) {
    if (clickedMovie._id === null) {
      api
        .postMovie(clickedMovie)
        .then((newMovie) => {
          setMovies(state => {
            const newState = state.map((movie) => (movie.movieId === newMovie.data.movieId) ? newMovie.data : movie);
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
              return (movie.movieId === clickedMovie.movieId) ?
                { ...movie, _id: null } :
                movie;
            })
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
        {showHeader && <Header authorized={loggedIn} />}
        <main>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <ProtectedRoute
              path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              movies={movies}
              status={status}
              filterFunction={filterMovies}
              filter={filter}
              onSearch={setNewFilter}
              onLikeClick={handleLikeClick}
            />
            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              movies={movies}
              status={status}
              filterFunction={filterFavoriteMovies}
              filter={favoriteFilter}
              favorite={true}
              onSearch={setNewFavoriteFilter}
              onLikeClick={handleLikeClick}
            />
            <ProtectedRoute
              path='/profile'
              component={Profile}
              loggedIn={loggedIn}
              user={currentUser}
              onSubmit={handleUserUpdate}
              onLogout={handleLogout}
            />
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
