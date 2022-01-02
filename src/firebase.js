import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/messaging";
import "firebase/functions";
var firebaseConfig = {
  apiKey: "AIzaSyBxdBi4D5Cb-IAlMZCU8N7Ds5tdDRSnOgs",
  authDomain: "auctionhouse-f54b8.firebaseapp.com",
  projectId: "auctionhouse-f54b8",
  storageBucket: "auctionhouse-f54b8.appspot.com",
  messagingSenderId: "441192488353",
  appId: "1:441192488353:web:2ed0624cd566cc7e1b7fe0",
  measurementId: "G-4Y1JQQJ5C1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export default firebase;
