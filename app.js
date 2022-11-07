
const firebaseConfig = {
    apiKey: "AIzaSyA002LsdsULgeS4oDzmJ8ckFg10_7UdNxQ",
    authDomain: "test-d3ff6.firebaseapp.com",
    projectId: "test-d3ff6",
    storageBucket: "test-d3ff6.appspot.com",
    messagingSenderId: "620970481245",
    appId: "1:620970481245:web:daaba434f907f09e38dfb4",
    measurementId: "G-ERP7EDK9VF",
    storageBucket: "test-d3ff6.appspot.com",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
var userData = [{ name: 'sameer', email: 'default@gmail.com', password: '123' }];
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

async function getData() {
    try {
        await db.collection("formdata").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                userData.push(doc.data())
                localStorage.setItem('userData', JSON.stringify(userData));
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
    !isFound && alert('Invalid Credentials');
    console.log('currentUser' + isFound);
}




























