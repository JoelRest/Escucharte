import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1sB6zajHZTJqLj8CH_lQyuwdqkA___4s",
  authDomain: "notb7app.firebaseapp.com",
  projectId: "notb7app",
  storageBucket: "notb7app.firebasestorage.app",
  messagingSenderId: "102437536515",
  appId: "1:102437536515:web:0e3fd47f8581819bc2df36"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;