import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyATS3ATWX0EgLyfEyOBkt172eXWQKuSvoQ",
  authDomain: "my-movies-48e3a.firebaseapp.com",
  databaseURL: "https://my-movies-48e3a.firebaseio.com/",
  storageBucket: "gs://my-movies-48e3a.appspot.com/",
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
