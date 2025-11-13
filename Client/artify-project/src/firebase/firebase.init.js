// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOqiiToezFKesh7QJs7JFhmyYyMo2gcTQ",
  authDomain: "artify-project-fd857.firebaseapp.com",
  projectId: "artify-project-fd857",
  storageBucket: "artify-project-fd857.firebasestorage.app",
  messagingSenderId: "64082031037",
  appId: "1:64082031037:web:ed261d30900ec6b458e2d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);