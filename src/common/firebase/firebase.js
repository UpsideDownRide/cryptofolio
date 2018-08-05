import firebase from 'firebase/app'
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAVab6zQjti5EK7T9GxE5gKOcEBInkkyJ0",
    authDomain: "havencrypto.firebaseapp.com",
    databaseURL: "https://havencrypto.firebaseio.com",
    projectId: "havencrypto",
    storageBucket: "havencrypto.appspot.com",
    messagingSenderId: "728450041717"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const auth = firebase.auth()

export {
    auth,
}