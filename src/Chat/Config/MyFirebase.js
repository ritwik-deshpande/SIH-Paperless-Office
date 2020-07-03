import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAQyWzJLRX15cItz0Vkxn4zALCCNWr9OlA",
    authDomain: "digidocs-2ef17.firebaseapp.com",
    databaseURL: "https://digidocs-2ef17.firebaseio.com",
    projectId: "digidocs-2ef17",
    storageBucket: "digidocs-2ef17.appspot.com",
    messagingSenderId: "380021373381",
    appId: "1:380021373381:web:62dffd24653af63d6c33ac",
    measurementId: "G-S4K4YQTYB1"
}
firebase.initializeApp(config)
firebase.firestore().settings({
    timestampsInSnapshots: true
})

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()
