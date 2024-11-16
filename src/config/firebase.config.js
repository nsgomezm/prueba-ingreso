import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA8ORZmWOIr5EU2S4VYrGukAfij6atfqp8",
  authDomain: "linktick-pruba-ingreso.firebaseapp.com",
  projectId: "linktick-pruba-ingreso",
  storageBucket: "linktick-pruba-ingreso.firebasestorage.app",
  messagingSenderId: "1063271064115",
  appId: "1:1063271064115:web:573816a9a720d5372a7946",
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()
const storage = getStorage(app)

export { app, auth, db, storage }