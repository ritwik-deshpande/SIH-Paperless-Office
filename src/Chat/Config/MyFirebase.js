import firebase from 'firebase'

const config = {
//     apiKey: "AIzaSyAQyWzJLRX15cItz0Vkxn4zALCCNWr9OlA",
//     authDomain: "digidocs-2ef17.firebaseapp.com",
//     databaseURL: "https://digidocs-2ef17.firebaseio.com",
//     projectId: "digidocs-2ef17",
//     storageBucket: "digidocs-2ef17.appspot.com",
//     messagingSenderId: "380021373381",
//     appId: "1:380021373381:web:62dffd24653af63d6c33ac",
//     measurementId: "G-S4K4YQTYB1"

apiKey: "AIzaSyDf_LAIJ5ZRxg4zB1RLQePdaF8Aze_l8v8",
authDomain: "digidocs-db5cd.firebaseapp.com",
databaseURL: "https://digidocs-db5cd.firebaseio.com",
projectId: "digidocs-db5cd",
storageBucket: "digidocs-db5cd.appspot.com",
messagingSenderId: "108690708237",
appId: "1:108690708237:web:f50c4f55a4e31e3990c244",
measurementId: "G-X8PF1TP917"
}
firebase.initializeApp(config)
firebase.firestore().settings({
    timestampsInSnapshots: true
})
firebase.analytics();

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()
//need to check if browser supports
export const messaging = firebase.messaging();

// // register service worker & handle push events
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', async () => {
//         const registration = await navigator.serviceWorker.register('../../firebase-messaging-sw.js', {
//             updateViaCache: 'none'
//         });
//         messaging.useServiceWorker(registration);
//         messaging.onMessage((payload) => {
//             console.log(payload)
//             const title = payload.notification.title;
//             const options = {
//                 body: payload.notification.body,
//                 icon: payload.notification.icon,
//                 actions: [
//                     {
//                         action: payload.fcmOptions.link,
//                         title: 'Book Appointment'
//                     }
//                 ]
//             };
//             registration.showNotification(title, options);           
//         });
//     });
//}