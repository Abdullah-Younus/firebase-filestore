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

var storageRef = firebase.storage().ref();

async function uploadData() {
    let file = document.getElementById('files').files[0];
    let thisref = storageRef.child(file.name).put(file);
    console.log(file);
    console.log(thisref);
    await thisref.on('state_changed', function (snapshot) {
    }, function (error) {
    }, async function () {
        // Uploaded completed successfully, now we can get the download URL
        await thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            //getting url of image
            console.log('image URL', downloadURL);
            localStorage.setItem('imageURL', downloadURL)
        });
    });
}

function createhandleFrom() {
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    let imageURL = localStorage.getItem('imageURL');

    var obj1 = {
        user: currentuser.name,
        img: imageURL,
        txt_field: document.getElementById('txt_field').value,
        title_item: document.getElementById('title_item').value,
        des_item: document.getElementById('des_item').value,
        product_search: document.getElementById('product_search').value,
        date: document.getElementById('date').value,
    }
    console.log('obj1', obj1);
    db.collection("createform").add(obj1).then((docRef) => {
        // console.log("Document written with ID: ", docRef.id);
        alert('Data success');
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
    // uploadData();
}


// storageRef.put(file).then(() => {
//     firebase.storage().ref().child().getDownloadURL()
//         .then((downloadURL) => {
//             console.log(downloadURL)
//             localStorage.setItem('imageURL', downloadURL)
//         })
// })

// createfrom function data store firebase filestore