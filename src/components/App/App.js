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
  return (
    <div className='page'>
      <Header authorized={false}/>
      <Switch>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies />
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
