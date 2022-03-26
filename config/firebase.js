import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASRvqTbBV61Va8I4boRyOU5yvY942tsFQ",
  authDomain: "test2-7ed41.firebaseapp.com",
  databaseURL: "https://test2-7ed41-default-rtdb.firebaseio.com",
  projectId: "test2-7ed41",
  storageBucket: "test2-7ed41.appspot.com",
  messagingSenderId: "458106844118",
  appId: "1:458106844118:web:b1c9e9afb9120617d7ea77"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, storage, auth};
