var admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_KEYS)
try {
  !admin.apps.length &&
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (err) {
  console.log(err)
}

export const firestore = admin.firestore();