import admin, { FirebaseError } from 'firebase-admin'
import Credentials from './fc.json'

const { storage } = admin.initializeApp({
  credential: admin.credential.cert(Credentials as any),
})

const firebaseStorage = storage()

export { firebaseStorage, FirebaseError }
