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
import getMovies from '../../utils/MoviesApi';
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
  const [status, setStatus] = useState('success');
  const { pathname } = useLocation();

  const history = useHistory();

  const showHeader = (
    pathname === '/' ||
    pathname === '/movies' ||
    pathname === '/saved-movies' ||
    pathname === '/profile');

  const showFooter = (
    pathname === '/' ||
    pathname === '/movies' ||
    pathname === '/saved-movies');

  useEffect(() => {
    handleTokenCheck();
    getMovies()
    .then(res => {
      setMovies(res);
    })
    .catch(err => console.log(err))
  }, []);

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
        history.push('/movies');
      })
      .catch((err) => {
        err.then((err) => {
          console.log(err);
        });
      });
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

  function filterMovies(query) {
    setFilteredMovies(movies.filter(movie => movie.nameRU.toLowerCase().includes(query) || movie.nameEN.toLowerCase().includes(query)));
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
            <Route path='/movies'>
              <Movies movies={filteredMovies} status={status} onSearch={filterMovies} />
            </Route>
            <Route path='/saved-movies'>
              <SavedMovies movies={favoriteMovies} status={status} />
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
