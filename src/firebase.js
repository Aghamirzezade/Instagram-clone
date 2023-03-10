// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import toast from "react-hot-toast";
import { userHandle } from "utils";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCZg05AsB3VJ7oLPNUpszQ0E_F0yNvyHg",
  authDomain: "aga-instagram-clone.firebaseapp.com",
  projectId: "aga-instagram-clone",
  storageBucket: "aga-instagram-clone.appspot.com",
  messagingSenderId: "547520041867",
  appId: "1:547520041867:web:b640f81c7f560f0001558e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, async user => {
  if (user) {
    const dbUser = await getDoc(doc(db, 'users' , user.uid))
    let data={
      uid:user.uid,
      fullName : user.displayName,
      email : user.email,
      emailVerified: user.emailVerified,
      ...dbUser.data()
    }
    userHandle(data);
  } else {
    userHandle(false);
  }
});

export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    toast.error(err.code);
  }
};


export const getUserInfo = async uname =>{
  const username = await getDoc(doc(db, "usernames", uname));
  if(username.exists()){
    return (await getDoc(doc(db,'users', username.data().user_id))).data()
   
  } else{
    toast.error('Username is not defined!')
      throw new Error('Username is not defined!')
  }
}


export const register = async ({ email, password, full_name, username }) => {
  try {
    const user = await getDoc(doc(db, "usernames", username));
    if (user.exists()) {
      toast.error(
        `${username} username used other user, please change your username`
      );
    } else {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (response.user) {
        await setDoc(doc(db, "usernames", username), {
          user_id: response.user.uid,
        })

        await setDoc(doc(db, "users", response.user.uid), {
          fullName : full_name,
          username: username,
          followers: [],
          following: [],  
          notifications: [],
          website : '',
          bio: '',
          phoneNumber: '',
          gender: '',
          posts:0
        })
        await updateProfile(auth.currentUser, {
          displayName: full_name
        })
        return response.user;
      }
    }
  } catch (err) {
    toast.error(err.code);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    toast.error(err.code);
  }
};
