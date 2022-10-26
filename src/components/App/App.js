import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import { generateId } from '../../utils/utils';
import getAllMovies from '../../utils/MoviesApi';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import LoginRegister from '../LoginRegister/LoginRegister';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import Notification from '../Notification/Notification';
import { NOTIFICATION_TYPES } from '../../utils/constants';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [movieList, setMovieList] = useState([]);
  const [filter, setFilter] = useState({ query: '', shorts: false });
  const [favoriteFilter, setFavoriteFilter] = useState({ query: '', shorts: false });
  const [status, setStatus] = useState('success');
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [userUpdateError, setUserUpdateError] = useState('');
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

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

  function addNotification(type, name) {
    const notification = NOTIFICATION_TYPES[type][name];
    notification.id = generateId();
    setNotificationList([...notificationList, notification]);
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    setRegisterError('');
    setLoginError('');
    setUserUpdateError('');
  }, [pathname]);

  async function getAndSetMovies() {
    setStatus('loading');
    try {
      let [allMovies, favoriteMovieList] = await Promise.all([getAllMovies(), api.getUsersMovies()]);
      favoriteMovieList = favoriteMovieList.data;
      allMovies = allMovies.map(movie => {
        const favoriteCard = favoriteMovieList.find(favoriteMovie => favoriteMovie.movieId === movie.id);
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
      setStatus('success');
      setMovieList(allMovies);
      if (localStorage.getItem('filter')) {
        setFilter(JSON.parse(localStorage.getItem('filter')));
      }
    } catch (err) {
      console.log(err);
      setStatus('error');
    }
  };

  function deleteUserInfo() {
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

  //user
  function handleTokenCheck() {
    if (!localStorage.getItem('jwt')) {
      return;
    }
    const jwt = localStorage.getItem('jwt');
    const path = pathname;
    auth
      .checkToken(jwt)
      .then((res) => {
        setCurrentUser(res.data);
        setLoggedIn(true);
        getAndSetMovies();
        addNotification('success', 'login');
        history.push(path)
      })
      .catch((err) => {
        deleteUserInfo();
        addNotification('error', 'any');
      });
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((res) => {
        if (res?.token) {
          localStorage.setItem('jwt', res.token);
          setLoginError('');
          setCurrentUser(res.data);
          setLoggedIn(true);
          getAndSetMovies();
          addNotification('success', 'login');
          history.push('/movies');
        }
      })
      .catch((errJson) => {
        addNotification('error', 'any');
        errJson.then((err) => {
          setLoginError(err.message);
        });
      });
  }

  function handleLogout() {
    deleteUserInfo();
  }

  function handleRegistration(name, password, email) {
    auth
      .register(name, password, email)
      .then((res) => {
        handleLogin(password, email);
        setRegisterError('');
        addNotification('success', 'register');
      })
      .catch((errJson) => {
        addNotification('error', 'any');
        errJson.then((err) => {
          setRegisterError(err.message);
        });
      });
  }

  function handleUserUpdate(userInfo) {
    api
      .setProfile(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
        setUserUpdateError('');
        setUserUpdateSuccess(true);
        setTimeout(() => setUserUpdateSuccess(false), 2000);
        addNotification('success', 'userUpdate');
      })
      .catch((errJson) => {
        addNotification('error', 'any');
        errJson.then((err) => {
          setUserUpdateError(err.message);
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
      const filteredCollection = movieList.filter(movie => {
        return movie.nameRU.toLowerCase().includes(filter.query) &&
          ((filter.shorts && movie.duration < 40) || (!filter.shorts && movie.duration > 40));
      })
      return filteredCollection;
    }
    return []
  }

  function filterFavoriteMovies() {
    const favoriteMovies = movieList.filter(movie => movie._id !== null);
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
          setMovieList(state => {
            const newState = state.map((movie) => (movie.movieId === newMovie.data.movieId) ? newMovie.data : movie);
            return newState;
          });
          addNotification('success', 'like');
        })
        .catch((errJson) => {
          addNotification('error', 'any');
        });
    } else {
      api
        .deleteMovie(clickedMovie._id)
        .then(() => {
          setMovieList(state => {
            const newState = state.map((movie) => {
              return (movie.movieId === clickedMovie.movieId) ?
                { ...movie, _id: null } :
                movie;
            })
            return newState;
          });
          addNotification('success', 'dislike');
        })
        .catch((errJson) => {
          addNotification('error', 'any');
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
              movies={movieList}
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
              movies={movieList}
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
              success={userUpdateSuccess}
              error={userUpdateError}
              onSubmit={handleUserUpdate}
              onLogout={handleLogout}
            />
            <Route path='/signin'>
              <LoginRegister
                type='signin'
                formName='signin'
                title='Рады видеть!'
                submitText='Войти'
                error={loginError}
                onSubmit={handleLogin}
              />
            </Route>
            <Route path='/signup'>
              <LoginRegister
                type='signup'
                formName='signup'
                title='Добро пожаловать!'
                submitText='Зарегистрироваться'
                error={registerError}
                onSubmit={handleRegistration}
              />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        {showFooter && <Footer />}
        <Notification notificationList={notificationList} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
