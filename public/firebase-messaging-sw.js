// import firebase scripts inside service worker js script
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 firebase.initializeApp({
    apiKey: "AIzaSyDf_LAIJ5ZRxg4zB1RLQePdaF8Aze_l8v8",
authDomain: "digidocs-db5cd.firebaseapp.com",
databaseURL: "https://digidocs-db5cd.firebaseio.com",
projectId: "digidocs-db5cd",
storageBucket: "digidocs-db5cd.appspot.com",
messagingSenderId: "108690708237",
appId: "1:108690708237:web:f50c4f55a4e31e3990c244",
measurementId: "G-X8PF1TP917",
  });
  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();
  // [END initialize_firebase_in_sw]

// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
    const n = {
      title: payload.notification.title,
      content : payload.notification.body
    }
    if(localStorage.getItem("notifs"))
      notifs = JSON.parse(localStorage.getItem("notifs"))
    const temp = {...notifs, "n5" : n}
    localStorage.setItem("notifs", JSON.stringify(temp))
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
//   [END background_handler]
self.addEventListener('notificationclick', (event) => {
    if (event.action) {
        clients.openWindow(event.action);
    }
    event.notification.close();
}); 

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../src/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }

//curl -X POST --header "Authorization: key=AAAAGU54lw0:APA91bHEnu5b7-2Y92o4ebKWbTPXk4hUznA4r5ZrtQce-3isbCZnmp1UQ-AWbwh64Eyt6FfYsjmJmShCzDzO8uusU7LYzB0q0KKX0Rqr4U2iYm_RDIIM1sM_qcjx8J7dLvspl7xCqOiv" --Header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"e85QuqD_aFCd6JXStpVHRR:APA91bGGMJ3el9jxFT7H49bGuJQ-uQdfK24Juf8cnJyFYp-K0aes1oBUHcetLrgOJV19iuxbB291p6lb8gd9BLmm2uNsLSZL7gyAHThukYqtQpqp5hAK8ZGv0ycSk5NihX8l7xck_Dqr\",\"notification\":{\"body\":\"Yellow\"},\"priority\":10}"
