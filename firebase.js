const firebaseConfig = {
  apiKey:"AIzaSyABdEEMZ_Q52P5E01Cy2PPmKAAXvHnTetQ",
  authDomain:"pgkhojo-1180e.firebaseapp.com",
  projectId:"pgkhojo-1180e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
