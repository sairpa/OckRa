import firebase from "firebase/app"
import "firebase/auth"
const app = firebase.initializeApp({
    apiKey: "AIzaSyDIOX-OQaNizdZ3EIISi9Jep1QxeDc2BVQ",
    authDomain: "user-auth-603a1.firebaseapp.com",
    projectId: "user-auth-603a1",
    storageBucket: "user-auth-603a1.appspot.com",
    messagingSenderId: "804275251087",
    appId: "1:804275251087:web:1ed8ba230202e74eae8dfa",
    measurementId: "G-BKTQGJVPWP"
})
export const auth = app.auth()
export default app
