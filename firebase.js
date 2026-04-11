const firebaseConfig = {
  apiKey: "AIzaSyABdEEMZ_Q52P5E01Cy2PPmKAAXvHnTetQ",
  authDomain: "pgkhojo-1180e.firebaseapp.com",
  projectId: "pgkhojo-1180e",
  storageBucket: "pgkhojo-1180e.appspot.com",
  messagingSenderId: "976145591846",
  appId: "1:976145591846:web:be2ecc09a15225eb4d80e7"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
