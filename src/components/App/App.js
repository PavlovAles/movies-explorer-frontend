import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function App() {

  const cards = [
    { id: 65432, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65433, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65434, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65435, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65436, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
    { id: 65437, url: 'https://clck.ru/32GaqW', link: 'https://clck.ru/32GaqW', caption: 'Афиша фильма', name: '33 слова', duration: '1ч 47м' },
  ]

  const status = 'success';

  return (
    <div className='page'>
      <Header authorized={true}/>
      <Switch>
        <Route path='/movies'>
          <Movies cards={cards} status={status} />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies cards={cards.slice(0,3)} status={status} />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/signin'>
          <Register />
        </Route>
        <Route path='/signup'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Main />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
