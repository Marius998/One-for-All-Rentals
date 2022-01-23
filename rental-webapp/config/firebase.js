import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZUudmreUQa7_dmraUzYFVh81k6vNgyd4",
  authDomain: "one-for-all-b8cd4.firebaseapp.com",
  databaseURL: "https://one-for-all-b8cd4.firebaseio.com",
  projectId: "one-for-all-b8cd4",
  storageBucket: "one-for-all-b8cd4.appspot.com",
  messagingSenderId: "348698625292",
  appId: "1:348698625292:web:09beb4b98cbf833c0cf529",
  measurementId: "G-69L7SPSRWB",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
