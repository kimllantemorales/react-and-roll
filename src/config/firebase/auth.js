import { auth, provider } from './firebase';

// Sign In Manually
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign In with Google
export const doSignInWithGoogle = () =>
  auth.signInWithPopup(provider);

// Sign out
export const doSignOut = () =>
  auth.signOut();