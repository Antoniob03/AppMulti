// firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA6nH1qX006grOvdzhjW_HUQe84mxZsCJI",
  authDomain: "examen2-2fbf6.firebaseapp.com",
  projectId: "examen2-2fbf6",
  storageBucket: "examen2-2fbf6.appspot.com", // nota: aquí corregí el dominio
  messagingSenderId: "934396391662",
  appId: "1:934396391662:web:58bf2c840baa6ef1b183ff"
};

export const app = initializeApp(firebaseConfig);
