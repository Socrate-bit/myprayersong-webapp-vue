import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

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

export { app, db, analytics }
