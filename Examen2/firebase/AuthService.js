// firebase/AuthService.js
import {
  initializeAuth,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from './firebaseConfig';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  return auth.signOut();
};

export const getCurrentUser = () => {
  return auth.currentUser;
}; 
