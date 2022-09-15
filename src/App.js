import './App.css';
import './i18n';
import { HashRouter as MyRouter, Route, Redirect, Switch } from 'react-router-dom';
import UserSignupPage from './pages/UserSignupPage';
import UserLoginPage from './pages/UserLoginPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import TopBar from './components/TopBar';
import LanguageSelector from '../src/components/LanguageSelector';
import React from 'react';
import { useSelector } from 'react-redux';

// default olarak function olarak gelir fakat biz login yapmış mı ve username gibi global state tutacağız o  yüzden class'a çeviriyoruz.
const App = () => {

  const { isLoggedIn } = useSelector((store) => ({ isLoggedIn: store.isLoggedIn }));

  return (
    <div>
      <MyRouter>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage} />

          {!isLoggedIn && <Route path="/login" component={UserLoginPage} />}

          {!isLoggedIn && <Route path="/signup" component={UserSignupPage} />}

          <Route path="/user/:username" component={UserPage} />

          <Redirect to="/" />

        </Switch>
        <LanguageSelector />
      </MyRouter>

    </div>
  );

}

export default App;
