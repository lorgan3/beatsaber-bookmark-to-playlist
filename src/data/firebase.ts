import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent as log } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC697caFxgZ-NFlqXoZLyUVl3VxdG_Pxqk",
  authDomain: "beatsaber-bookmark-to-playlist.firebaseapp.com",
  projectId: "beatsaber-bookmark-to-playlist",
  storageBucket: "beatsaber-bookmark-to-playlist.appspot.com",
  messagingSenderId: "157912179417",
  appId: "1:157912179417:web:7e4d93b640095c4ef014c8",
  measurementId: "G-NJKQ5WTXQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const logEvent = (
  eventName: string,
  eventParams?: { [key: string]: any }
) => {
  log(analytics, eventName, eventParams);
};
