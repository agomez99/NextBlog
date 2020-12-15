import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDX29cdd9Oi_Y0IvpoFO2i02BW-SGmCiTs",
    authDomain: "blogapp-60f41.firebaseapp.com",
    projectId: "blogapp-60f41",
    storageBucket: "blogapp-60f41.appspot.com",
    messagingSenderId: "333511332379",
    appId: "1:333511332379:web:bb2065bb03d567bae9debe"
  };
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;