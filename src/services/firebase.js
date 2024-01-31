import firebaseConfig from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, app as default };