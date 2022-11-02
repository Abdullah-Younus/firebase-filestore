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

var allformData = [];

async function getallData() {
    try {
        await db.collection("createform").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                allformData.push(doc.data());
            });
            localStorage.setItem("all", JSON.stringify(allformData));
            // console.log('All Data Get', allformData);
        });


    } catch (error) {
        console.log(error);
    }
}




// allformData get all values function print html tag?

function check() {
    // console.log('All Data Get', allformData);
    let users = localStorage.getItem("all");
    let alluserdata = JSON.parse(users);
    console.log('All Data', alluserdata);
    // alluserdata.map((e) => {
    //     console.log(e.img);
    // })
    // alluserdata.forEach((user) => {
    //     console.log(user);
    //     // const img = document.createElement("img");
    //     // img.src = user.img;
    //     // div = div.b.appendChild(img);
    //     // console.log(div);
    // })


}


function response() {
    const found = document.getElementById('found').checked;
    const lost = document.getElementById('lost').checked;
    let users = localStorage.getItem("all");
    let alluser = JSON.parse(users);
    // console.log("lost", lost);
    // console.log("found", found);

    let result = [];

    found && (result = alluser.filter((item) => item.product_search === "found"));
    lost && (result = alluser.filter((item) => item.product_search === "lost"));

    console.log("found", found);
    console.log("lost", lost);
    console.log("Result", result);
}


response();