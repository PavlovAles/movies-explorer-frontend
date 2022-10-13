import { Route, Switch, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import LoginRegister from '../LoginRegister/LoginRegister';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './App.css';
import NotFound from '../NotFound/NotFound';

function App() {
  const { pathname } = useLocation();

  const showHeader = (
    pathname === '/' ||
    pathname === '/movies' ||
    pathname === '/saved-movies' ||
    pathname === '/profile');

  const showFooter = (
    pathname === '/' ||
    pathname === '/movies' ||
    pathname === '/saved-movies');

  const cards = [
    { id: 65432, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65433, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65434, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65435, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65436, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65437, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
  ]

  const user = { name: 'Виталий', email: 'mail@mail.ru' };

  const status = 'success';

  return (
    <div className='page'>
      {showHeader && <Header authorized={true} />}
      <main>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/movies'>
            <Movies cards={cards} status={status} />
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies cards={cards.slice(0, 3)} status={status} />
          </Route>
          <Route path='/profile'>
            <Profile
              user={user}
              onSubmit={() => { }}
              onLogout={() => { }}
            />
          </Route>
          <Route path='/signin'>
            <LoginRegister
              type='signin'
              formName='signin'
              title='Рады видеть!'
              submitText='Войти'
              onSubmit={() => { }}
            />
          </Route>
          <Route path='/signup'>
            <LoginRegister
              type='signup'
              formName='signup'
              title='Добро пожаловать!'
              submitText='Зарегистрироваться'
              onSubmit={() => { }}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
