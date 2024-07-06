
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';  //file uploaded in storage folder

const firebaseConfig = {
  apiKey: "AIzaSyDb_u11TM-y9oiGreaPq9S3pdyTjc0EspA",
  authDomain: "uploadfile-392ad.firebaseapp.com",
  projectId: "uploadfile-392ad",
  storageBucket: "uploadfile-392ad.appspot.com",
  messagingSenderId: "292422814507",
  appId: "1:292422814507:web:05105cda783c26a057936e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);