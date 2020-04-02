import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginComponent from './login/Login'
import SignupComponent from './signup/Signup'
import DashboardComponent from './dashboard/Dashboard'


const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyAWI2Nwtw0D3q1HS0Gt8xwZmWEIos81ayY",
  authDomain: "chattr-2c98d.firebaseapp.com",
  databaseURL: "https://chattr-2c98d.firebaseio.com",
  projectId: "chattr-2c98d",
  storageBucket: "chattr-2c98d.appspot.com",
  messagingSenderId: "492358849646",
  appId: "1:492358849646:web:cf8ea29e08c51cb2da827f",
  measurementId: "G-0LXZ2GFSBJ"
})

const routing = (
  <Router>
    <div id='router-container'>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
