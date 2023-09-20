// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1NvukqSrsDIQWUg7_Gxuc8ntsA_vJeds",
  authDomain: "chatbyte-b50a1.firebaseapp.com",
  projectId: "chatbyte-b50a1",
  storageBucket: "chatbyte-b50a1.appspot.com",
  messagingSenderId: "753526774853",
  appId: "1:753526774853:web:544425aa044d693d29572c",
  measurementId: "G-VN0NCGSZWF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();