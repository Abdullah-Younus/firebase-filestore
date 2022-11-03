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
var result = [];
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

    alluserdata.forEach((user) => {
        document.getElementById('card').innerHTML += `
        <div style="display: flex;align-items: center;flex-direction: column;width:25%;height:100%;padding:5px;margin:5px"> 
            <img src="${user.img}" style="width:300px;height:200px;" />
            <br/>
            <br/>   
            <label>Title field:${user.txt_field}</label>
            <label>Title Item:${user.title_item}</label>
            <label>Product Search:${user.product_search}</label>
            <label>Description:${user.des_item}</label>
            <label>Description:${user.date}</label>
            <label><b>Posted By:${user.user}</b></label>
        </div>
        `
    })


}


function response() {
    const found = document.getElementById('found').checked;
    // const lost = document.getElementById('lost').checked;
    let users = localStorage.getItem("all");
    let alluser = JSON.parse(users);
    // console.log("found", found);
    if (found === true) {
        found && (result = alluser.filter((item) => item.product_search === "found"));
        result.forEach((user) => {
            document.getElementById('check').innerHTML += `
            <div style="display: flex;align-items: center;flex-direction: column;width:25%;height:100%;padding:5px;margin:5px"> 
                <img src="${user.img}" style="width:300px;height:200px;" />
                <br/>
                <br/>   
                <label>Title field:${user.txt_field}</label>
                <label>Title Item:${user.title_item}</label>
                <label>Product Search:${user.product_search}</label>
                <label>Description:${user.des_item}</label>
                <label>Description:${user.date}</label>
                <label><b>Posted By:${user.user}</b></label>
            </div>
            `
        })
        document.getElementById('card').innerHTML = ""
    } else {
        result = null
        document.getElementById('found').checked = false
        alluser.forEach((user) => {
            document.getElementById('card').innerHTML += `
            <div style="display: flex;align-items: center;flex-direction: column;width:25%;height:100%;padding:5px;margin:5px"> 
                <img src="${user.img}" style="width:300px;height:200px;" />
                <br/>
                <br/>   
                <label>Title field:${user.txt_field}</label>
                <label>Title Item:${user.title_item}</label>
                <label>Product Search:${user.product_search}</label>
                <label>Description:${user.des_item}</label>
                <label>Description:${user.date}</label>
                <label><b>Posted By:${user.user}</b></label>
            </div>
            `
        })
        document.getElementById('check').innerHTML = ""
    }


    // lost && (result = alluser.filter((item) => item.product_search === "lost"));



    console.log("found", found);
    console.log("lost", lost);
    console.log("Result", result);
}



// response();