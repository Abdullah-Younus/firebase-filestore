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

var userData = [];
var isFound = false;

var form = document.getElementById('myForm');
function handleForm(event) {
    event.preventDefault();
    let obj = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    // event.preventDefault();
    db.collection("formdata").add(obj).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert('SignUp success');
        window.location.href = './index.html';
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });

}

form.addEventListener('submit', handleForm);

// function handleForm(e) {
//     e.preventDefault();
//     let obj = {
//         name: document.getElementById('name').value,
//         email: document.getElementById('email').value,
//         password: document.getElementById('password').value,
//     };
//     // event.preventDefault();
//     db.collection("formdata").add(obj).then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//         alert('SignUp success');
//         window.location.href = './index.html';
//     }).catch((error) => {
//         console.error("Error adding document: ", error);
//     });
// }
// get data from Firebase
function getData() {
    try {
        db.collection("formdata").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                localStorage.setItem('userData', JSON.stringify(userData));
                userData.push(doc.data())
                console.log("Document userData: ", userData);
            });
        });

    } catch (error) {
        console.log(error);
    }
}

function handleLogin() {
    let users = JSON.parse(localStorage.getItem('userData'));
    let obj = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == obj.email && users[i].password == obj.password) {
            alert('login success');
            localStorage.setItem('currentUser', JSON.stringify(users[i]));
            isFound = true;
            window.location.href = './home.html';
            break;
        } else {
            isFound = false;
        }
    }
    console.log('currentUser' + isFound);
}



// createfrom function data store firebase filestore


function createhandleFrom() {
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(currentuser.name);
    // document.write(currentuser)
    var obj1 = {
        currentuser: currentuser.name,
        txt_field: document.getElementById('txt_field').value,
        title_item: document.getElementById('title_item').value,
        des_item: document.getElementById('des_item').value,
        product_search: document.getElementById('product_search').value,
        img: document.getElementById('img').value,
        date: document.getElementById('date').value
    }
    console.log('obj1', obj1);
    db.collection("createform").add(obj1).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert('Data success');
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}




