// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";

// form data store firebase filestore implementation?

const firebaseConfig = {
    apiKey: "AIzaSyA002LsdsULgeS4oDzmJ8ckFg10_7UdNxQ",
    authDomain: "test-d3ff6.firebaseapp.com",
    projectId: "test-d3ff6",
    storageBucket: "test-d3ff6.appspot.com",
    messagingSenderId: "620970481245",
    appId: "1:620970481245:web:daaba434f907f09e38dfb4",
    measurementId: "G-ERP7EDK9VF"
};

firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

function dataStore() {
    let obj = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    // event.preventDefault();
    db.collection("formdata").add(obj).then((docRef) => {
        localStorage.setItem('userobj', JSON.stringify(obj));
        console.log("Document written with ID: ", docRef.id);
        window.location.href = './login.html';
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}



