import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBmxgif5PN73dygHKMM2nNKZHZozCO2HLs",
    authDomain: "docs-clone-d06b9.firebaseapp.com",
    projectId: "docs-clone-d06b9",
    storageBucket: "docs-clone-d06b9.appspot.com",
    messagingSenderId: "896343043924",
    appId: "1:896343043924:web:e79e79e77b8354f615e2c1"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();

  export {db};