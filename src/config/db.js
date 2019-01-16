import Firebase from 'firebase'
 let config = {
    apiKey: "AIzaSyD80Ks_3D0mYASkBEJ25DPV2eJypwaE-zU",
    authDomain: "vuejs-app-9414a.firebaseapp.com",
    databaseURL: "https://vuejs-app-9414a.firebaseio.com",
    projectId: "vuejs-app-9414a",
    storageBucket: "vuejs-app-9414a.appspot.com",
    messagingSenderId: "368369238372"
  };
let app = Firebase.initializeApp(config)
export const db = app.database()
