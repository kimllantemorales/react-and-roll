import firebase from 'firebase';
import firebaseApp from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAYH4BN1gU0L0f14dKpUyw-0kcJc1Z_fM4",
  authDomain: "react-and-roll.firebaseapp.com",
  databaseURL: "https://react-and-roll.firebaseio.com",
  projectId: "react-and-roll",
  storageBucket: "react-and-roll.appspot.com",
  messagingSenderId: "1073568857090"
};

if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(config);
}

const auth = firebaseApp.auth();
const provider = new firebaseApp.auth.GoogleAuthProvider();
const database = firebase.database();

export {
  auth,
  database,
  provider,
};