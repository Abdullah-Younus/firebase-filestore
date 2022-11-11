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
let map, infoWindow;


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 49.246292, lng: -123.116226 },
        zoom: 20,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    positionObj = pos;
                    console.log('Lat Long Object :', positionObj);
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
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