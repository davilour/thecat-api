import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvEdGW1YoAg-IqD6eYmlUGhF4-fZhI5MA",
    authDomain: "thecatapi-880b8.firebaseapp.com",
    projectId: "thecatapi-880b8",
    storageBucket: "thecatapi-880b8.appspot.com",
    messagingSenderId: "1008993878651",
    appId: "1:1008993878651:web:d7158faf8c592fe3b218de",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, app as default };
