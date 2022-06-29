import firebase from "firebase";
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBYlqMHo8y8p3yaMBZX9X7mh4t-wRzWrdk",
    authDomain: "shades-c1735.firebaseapp.com",
    projectId: "shades-c1735",
    storageBucket: "shades-c1735.appspot.com",
    messagingSenderId: "506611926434",
    appId: "1:506611926434:web:7cc8731f072b9db47a1efb",
    measurementId: "G-GHKHNTHZGH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const storage = firebase.storage();

// Export
export { storage }
