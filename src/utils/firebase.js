import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyATS3ATWX0EgLyfEyOBkt172eXWQKuSvoQ",
  authDomain: "my-movies-48e3a.firebaseapp.com",
  databaseURL: "https://my-movies-48e3a.firebaseio.com/",
  storageBucket: "gs://my-movies-48e3a.appspot.com/",
};
firebase.initializeApp(config);

export default firebase;
