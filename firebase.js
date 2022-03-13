import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSdpf0m_sRxbnBAu-8aUccacG6G7NmkN0",
  authDomain: "wsss-6c3ba.firebaseapp.com",
  projectId: "wsss-6c3ba",
  storageBucket: "wsss-6c3ba.appspot.com",
  messagingSenderId: "359258284626",
  appId: "1:359258284626:web:213de136bc211e67bb358b"
};



const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = getStorage(firebaseApp);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider, storage };
