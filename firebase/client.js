import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDmzC7306p-ef2--zU_5z32UECtZQWDEdA",
  authDomain: "devver-efaf9.firebaseapp.com",
  projectId: "devver-efaf9",
  storageBucket: "devver-efaf9.appspot.com",
  messagingSenderId: "924190470220",
  appId: "1:924190470220:web:ad9fbf2d7dc58ded69c4e9",
  measurementId: "G-MTPDW6D7L5"
};

!firebase.apps.length &&
  firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
      onChange(normalizedUser)
    })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
}

export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    img,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}