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

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
}