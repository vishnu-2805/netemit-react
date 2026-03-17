import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAjMKEmbPRJH_1RJVnTIYWn-6yeJTfkBok",
  authDomain: "netemit-961c5.firebaseapp.com",
  projectId: "netemit-961c5",
  storageBucket: "netemit-961c5.firebasestorage.app",
  messagingSenderId: "971613949090",
  appId: "1:971613949090:web:4576fbc4d3bbd8b85d1bfb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGithub = () => signInWithPopup(auth, githubProvider);
export const logOut = () => signOut(auth);