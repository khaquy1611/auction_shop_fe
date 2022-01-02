// /* eslint-disable no-undef */
// importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js');

// firebase.initializeApp({
//     apiKey: "AIzaSyBxdBi4D5Cb-IAlMZCU8N7Ds5tdDRSnOgs",
//     authDomain: "auctionhouse-f54b8.firebaseapp.com",
//     projectId: "auctionhouse-f54b8",
//     storageBucket: "auctionhouse-f54b8.appspot.com",
//     messagingSenderId: "441192488353",
//     appId: "1:441192488353:web:2ed0624cd566cc7e1b7fe0",
//     measurementId: "G-4Y1JQQJ5C1"
// });
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey("BLLUk0o7bwhtR1_xSeIoVjHzO8cPe0IMgDmTk3hXc6sVIYKWN1u0Twc6evXyJkaOVJIySeQYNtkhNdVE7xZDC8s")

// messaging.onBackgroundMessage(function(payload) {
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });