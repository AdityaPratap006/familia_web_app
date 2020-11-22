import Firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDF3t73XnFPQjKDja-Q1V-aqg8wT8II8do",
    authDomain: "familia-b923d.firebaseapp.com",
    databaseURL: "https://familia-b923d.firebaseio.com",
    projectId: "familia-b923d",
    storageBucket: "familia-b923d.appspot.com",
    messagingSenderId: "624940770520",
    appId: "1:624940770520:web:593c2a1326a33b3f1be3ad",
};

Firebase.initializeApp(firebaseConfig);

export { Firebase };
export const firebaseAuth = Firebase.auth();
firebaseAuth.setPersistence(Firebase.auth.Auth.Persistence.LOCAL);

export const googleAuthProvider = new Firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new Firebase.auth.FacebookAuthProvider();
facebookAuthProvider.addScope('email');
export const twitterAuthProvider = new Firebase.auth.TwitterAuthProvider();

