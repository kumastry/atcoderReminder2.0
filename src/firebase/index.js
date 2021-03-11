import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-functions'
import {firebaseConfig} from "./config";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const Firebasestamp = firebase.firestore.Timestamp;

