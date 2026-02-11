import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyC_F2YeKhSCc9mAst_9nR-7MCrfSZ4jfsY',
  authDomain: 'myprayersong-428ef.firebaseapp.com',
  projectId: 'myprayersong-428ef',
  storageBucket: 'myprayersong-428ef.firebasestorage.app',
  messagingSenderId: '713867134675',
  appId: '1:713867134675:web:332d37042b6f09d2efb626',
  measurementId: 'G-RFYRX13BHQ'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)
const functions = getFunctions(app)

if (location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

// Helper to construct public Firebase Storage URL
const getStorageUrl = (folder: string, filename: string) => {
  const bucket = firebaseConfig.storageBucket
  const path = `${folder}/${filename}`
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`
}

export { app, db, analytics, functions, getStorageUrl }
