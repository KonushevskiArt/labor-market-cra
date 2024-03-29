import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'

import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

const app = initializeApp(firebaseConfig)
// export const db = getFirestore(app)

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
})
export const storage = getStorage(app)
