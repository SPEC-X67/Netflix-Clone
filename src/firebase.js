import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: "AIzaSyA84GUATF-6omf8wYe5pOdZZs0lFQsar3U",
  authDomain: "netflix-clone-x67.firebaseapp.com",
  projectId: "netflix-clone-x67",
  storageBucket: "netflix-clone-x67.firebasestorage.app",
  messagingSenderId: "195666188121",
  appId: "1:195666188121:web:959b72fb8800403bebde48"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) { 
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}