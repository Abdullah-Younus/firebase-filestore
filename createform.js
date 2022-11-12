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

var imageURL;
let positionObj = {};
const db = firebase.firestore();

var storageRef = firebase.storage().ref();



function uploadData() {
    let file = document.getElementById('files').files[0];
    let thisref = storageRef.child(file.name).put(file);
    console.log(file);
    console.log(thisref);
    thisref.on('state_changed', function (snapshot) {
    }, function (error) {
    }, function () {
        // Uploaded completed successfully, now we can get the download URL
        thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            //getting url of image
            console.log('image URL', downloadURL);
            imageURL = downloadURL;
            // localStorage.setItem('imageURL', downloadURL)
        });
    });
}

function createhandleFrom() {
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    // let imageURL = localStorage.getItem('imageURL');

    var obj1 = {
        user: currentuser.name,
        img: imageURL,
        txt_field: document.getElementById('txt_field').value,
        title_item: document.getElementById('title_item').value,
        des_item: document.getElementById('des_item').value,
        product_search: document.getElementById('product_search').value,
        date: document.getElementById('date').value,
        userId: currentuser.id,
        position: positionObj,
    }
    console.log('obj1', obj1);
    console.log('positionObj', positionObj);
    db.collection("createform").add(obj1).then((docRef) => {
        // console.log("Document written with ID: ", docRef.id);
        alert('Data success');
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });


    // uploadData();
}

// Initialize and add the map
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map;
function initMap() {
    var latlng = new google.maps.LatLng(24.8607, 67.0011);
    map = new google.maps.Map(document.getElementById("map"), {
        center: latlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    // google.maps.event.addListener(map, 'click', function (event) {
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: 'Place the marker for your location!',
        draggable: true
    });
    google.maps.event.addListener(marker, 'dragend', function (a) {
        console.log("a", a);
        positionObj = {
            lat: a.latLng.lat(),
            lng: a.latLng.lng()
        }
        console.log('positionObj', positionObj);
    });
}
window.initMap = initMap;


// storageRef.put(file).then(() => {
//     firebase.storage().ref().child().getDownloadURL()
//         .then((downloadURL) => {
//             console.log(downloadURL)
//             localStorage.setItem('imageURL', downloadURL)
//         })
// })

// createfrom function data store firebase filestore