var admin = require("firebase-admin");

var serviceAccount = require("./firebase-keys.json");

try {
  !admin.apps.length &&
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (err) {
  console.log(err)
}

export const firestore = admin.firestore();