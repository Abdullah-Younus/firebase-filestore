
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
    console.log('currentUser' + isFound);
}

// image upload firebase?
// var storageRef = firebase.storage().ref();

// function uploadData() {
//     let file = document.getElementById('files').files[0];
//     let thisref = storageRef.child(file.name).put(file);
//     console.log(file);
//     console.log(thisref);
//     thisref.on('state_changed', function (snapshot) {
//     }, function (error) {
//     }, function () {
//         // Uploaded completed successfully, now we can get the download URL
//         thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//             //getting url of image
//             console.log(downloadURL);
//             localStorage.setItem('imageURL', downloadURL)
//         });
//     });
// }



// storageRef.put(file).then(() => {
//     firebase.storage().ref().child().getDownloadURL()
//         .then((downloadURL) => {
//             console.log(downloadURL)
//             localStorage.setItem('imageURL', downloadURL)
//         })
// })

// createfrom function data store firebase filestore


// function createhandleFrom() {

//     let currentuser = JSON.parse(localStorage.getItem('currentUser'));
//     let imageURL = localStorage.getItem('imageURL');
//     var obj1 = {
//         user: currentuser.name,
//         img: imageURL,
//         txt_field: document.getElementById('txt_field').value,
//         title_item: document.getElementById('title_item').value,
//         des_item: document.getElementById('des_item').value,
//         product_search: document.getElementById('product_search').value,
//         date: document.getElementById('date').value,
//     }
//     // console.log('obj1', obj1);
//     db.collection("createform").add(obj1).then((docRef) => {
//         // console.log("Document written with ID: ", docRef.id);
//         alert('Data success');
//     }).catch((error) => {
//         console.error("Error adding document: ", error);
//     });

//     // uploadData();
// }











