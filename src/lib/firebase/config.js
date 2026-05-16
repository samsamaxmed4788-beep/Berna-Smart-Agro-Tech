import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyMockApiKeyForDevelopmentOnly",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "berna-smart-agro.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "berna-smart-agro",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "berna-smart-agro.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://berna-smart-agro-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Realtime Database and get a reference to the service
export const rtdb = getDatabase(app);

export default app;
