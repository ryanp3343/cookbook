import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyASRvqTbBV61Va8I4boRyOU5yvY942tsFQ",
  authDomain: "test2-7ed41.firebaseapp.com",
  databaseURL: "https://test2-7ed41-default-rtdb.firebaseio.com",
  projectId: "test2-7ed41",
  storageBucket: "test2-7ed41.appspot.com",
  messagingSenderId: "458106844118",
  appId: "1:458106844118:web:b1c9e9afb9120617d7ea77"
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;