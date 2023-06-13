import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyApYfA6MK35AxAf69OX5RuLCIsuJul5d2g",
  authDomain: "promanager-db437.firebaseapp.com",
  projectId: "promanager-db437",
  storageBucket: "promanager-db437.appspot.com",
  messagingSenderId: "229921908662",
  appId: "1:229921908662:web:91039079385e65015e8317"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }