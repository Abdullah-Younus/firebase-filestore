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

function signup() {
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

// userData array current email password matching login function

function login() {
    // event.preventDefault();

    let obj = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    let emailExist = userData.some(user => user.email === obj.email);
    let passwordExist = userData.some(user => user.password === obj.password);

    if (emailExist && passwordExist) {
        console.log('login success');
    }
    else if (emailExist === false) {
        console.log('email invalid');
    }
    else if (passwordExist === false) {
        console.log('password invalid');
    } else {
        console.log('invalid email or password');
    }
    // console.log('login failed');




    // let index = userData.findIndex((user) => {
    //     return user.email === obj.email && user.password === obj.password;
    // });
    // if (index > -1) {
    //     localStorage.setItem('userobj', JSON.stringify(obj));
    // }
    // else {
    //     console.log();
    // }
    // console.log('huamra obj', obj)
    // for (i = 0; i < userData.length; i++) {
    //     if ((userData[i].email === obj.email) && (userData[i].password === obj.password)) {
    //         localStorage.setItem("curentuser", userData[i]);
    //     }
    //     else {
    //         console.log("err");
    //     }
    // }

    return false;

    // userData.map((eachItem, index) => {
    //     console.log(eachItem[index]);
    // })
    // for loop userData array
    // for (let i = 0; i < userData.length; i++) {
    //     console.log("Ya upper wala",Object. userData[i])
    //     // if (userData[i].email === obj.email && userData[i].password === obj.password) {
    //     //     console.log('user login success');
    //     // }
    //     // else if (userData[i].email !== obj.email) {
    //     //     console.log('email invalid');
    //     // }
    //     // else if (userData[i].password !== obj.password) {
    //     //     console.log('password invalid');
    //     // }
    //     // else {
    //     //     console.log('email or password invalid');
    //     // }
    // }

}








