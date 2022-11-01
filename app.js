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
                userData.push(doc.data())
                console.log('userData', userData)
            });
        });
    } catch (error) {
        console.log(error);
    }


}


function handleLogin() {
    let user = JSON.parse(localStorage.getItem('userData'));
    let obj = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    let emailExist = userData.some(user => user.email === obj.email); // ture ya false
    let passwordExist = userData.some(user => user.password === obj.password);
    console.log(emailExist);
    // if (emailExist && passwordExist) {
    //     alert('login success');
    //     window.location.href = './home.html';
    // }
    // else if (emailExist === false) {
    //     alert('email invalid');
    // }
    // else if (passwordExist === false) {
    //     alert('password invalid');
    // } else {
    //     alert('invalid email or password');
    // }
}


// createfrom function data store firebase filestore


// function createhandleFrom() {
//     let currentuser = JSON.parse(localStorage.getItem('currentuser'));
//     console.log(currentuser);

//     // document.write(currentuser)
//     var obj1 = {
//         txt_field: document.getElementById('txt_field').value,
//         title_item: document.getElementById('title_item').value,
//         des_item: document.getElementById('des_item').value,
//         product_search: document.getElementById('product_search').value,
//         img: document.getElementById('img').value,
//         date: document.getElementById('date').value,
//         currentuser: currentuser.name,
//     }
//     db.collection("createform").add(obj1).then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//         alert('Data success');
//     }).catch((error) => {
//         console.error("Error adding document: ", error);
//     });

// }