// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB2q_AddrmJegiUR7wgL90uFA3wPp_I8rM",
    authDomain: "banterbar-4ff3d.firebaseapp.com",
    databaseURL: "https://banterbar-4ff3d.firebaseio.com",
    projectId: "banterbar-4ff3d",
    storageBucket: "banterbar-4ff3d.appspot.com",
    messagingSenderId: "94183751358",
    appId: "1:94183751358:web:cfd8476aacd213b5e728ef",
    measurementId: "G-HBDHEVEVK7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Declare firebase constant
const db = firebase.firestore();
