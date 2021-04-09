import React from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter as Router} from 'react-router-dom'
import HomeComponent from './home/home';
import './index.css';
import LoginComponent from './login/login';
import reportWebVitals from './reportWebVitals';
import SignUpComponent from './signup/signup';
import ProfileComponent from './profile/profile';

const firebase = require("firebase");
require("firebase/firestore");


firebase.initializeApp({
  apiKey: "AIzaSyBlLZTSGmTm5g30pD4IrhtdepM4ZI1lrVM",
  authDomain: "projet-licence-9477d.firebaseapp.com",
  projectId: "projet-licence-9477d",
  storageBucket: "projet-licence-9477d.appspot.com",
  messagingSenderId: "78750795709",
  appId: "1:78750795709:web:4856d0aee01df5b303b4d4"
});

const routing = (
  <Router>
    <div id="routing-container">
      <Route path='/home' component={HomeComponent} ></Route>
      <Route path='/login' component={LoginComponent} ></Route>
      <Route path='/signUp' component={SignUpComponent} ></Route>
      <Route path='/profile' component={ProfileComponent} ></Route>
      <Route path='/' exact component={HomeComponent} ></Route>
      {/* 404 error page */}
      {/* <Route path="*" component={NotFoundPage} /> */}
    </div>
  </Router>
);


ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
