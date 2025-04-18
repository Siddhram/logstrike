import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyBeBdRsIFQWj4V21PsWakMC458C0xBa1EE",
  authDomain: "logstrike-2a65f.firebaseapp.com",
  projectId: "logstrike-2a65f",
  storageBucket: "logstrike-2a65f.firebasestorage.app",
  messagingSenderId: "67454159645",
  appId: "1:67454159645:web:820c680e5cb8f6ebc0aff4",
  measurementId: "G-BY9Z9BCPP8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
