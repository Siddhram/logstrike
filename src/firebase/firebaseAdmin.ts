// src/firebase/firebaseAdmin.ts
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from '../../serviceacc.json'; // Proper path to your Firebase service account

const adminApp = getApps().length === 0
  ? initializeApp({
      credential: cert(serviceAccount as any),
    })
  : undefined;

export const adminAuth = getAuth();
