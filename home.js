const firebaseConfig = {
    apiKey: "AIzaSyA002LsdsULgeS4oDzmJ8ckFg10_7UdNxQ",
    authDomain: "test-d3ff6.firebaseapp.com",
    databaseURL: "https://test-d3ff6-default-rtdb.firebaseio.com/",
    projectId: "test-d3ff6",
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
                if (allformData !== undefined) {
                    let user = doc.data();
                    user.id = doc.id;
                    allformData.push(user);
                    check(allformData)
                    localStorage.setItem("all", JSON.stringify(allformData));
                } else {
                    return allformData = "NOT ANY DATA";
                }
            });

            // console.log('All Data Get', allformData);
        });


    } catch (error) {
        console.log(error);
    }
}




// allformData get all values function print html tag?

function check(user) {
    // console.log('All Data Get', allformData);
    // let users = allformData;
    // let alluserdata = JSON.parse(allformData);
    if (user) {
        user.forEach((user) => {
            console.log('Ya Wala OBJ SEBDER', user);
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
                    <button type="button" onclick="return handleMessage('./message.html'+'?'+'${user.userId}','${user.userId}')">Chat</button>
            </div>
            `
        })
    }


}

// function handleDelete(id) {
//     let users = localStorage.getItem("all");
//     let alluserdata = JSON.parse(users);
//     console.log('All Data', alluserdata);
//     // localstorage array of multiply objects one index delete?

//     //remove object
//     for (var i = 0; alluserdata.length; i++) {
//         var data = alluserdata.data[i];
//         if (i === id) {
//             alluserdata.data.splice(data, 1);
//         }
//     }

//     console.log();

//     // alluserdata.forEach((user) => {
//     //     if (user.id === id) {
//     //         document.getElementById('card').innerHTML = "";
//     //     }
//     // });
//     // db.collection("createform").doc(id).delete().then(() => {
//     //     console.log("Document successfully deleted!");
//     // }).catch((error) => {
//     //     console.error("Error removing document: ", error);
//     // });

// }

function handleMessage(url, id) {
    console.log('ID CHECK', id);
    console.log('URL ', url);
    // window.location.href = "./message.html"
    window.open(url, '_blank');
}

function sendMessage() {
    var url = document.URL;
    var url_array = url.split('?') // Split the string into an array with / as separator
    var receiverId = url_array[url_array.length - 1];  // Get the last part of the array (-1)
    // find user from local storage by receiverId
    let users = localStorage.getItem("userData");
    let alluserdata = JSON.parse(users);
    let user = alluserdata.find((user) => user.id === receiverId);
    // return console.log('user :', user);
    let myName = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(myName);
    console.log(currentUser.name);
    console.log(currentUser.id);
    let message = document.getElementById('message').value;
    console.log('Message :', message);
    firebase.database().ref("messages").push().set({
        receiverId: receiverId,
        receiverName: user.name,
        senderId: currentUser.id,
        senderName: currentUser.name,
        message: message,
        read: false,
        timestamp: Date.now(),
    });
    // allMessage();
}

function allMessage() {
    var url = document.URL;
    var url_array = url.split('?') // Split the string into an array with / as separator
    var receiverId = url_array[url_array.length - 1];
    console.log('receiverId', receiverId);
    let myName = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(myName);
    let senderId = currentUser.id;
    const dbRef = firebase.database().ref();
    dbRef.child("messages").on("value", function (snapshot) {
        // put all messages in array
        let messages = [];
        // read messages and update read status
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            messages.push(childData);
            if (childData.receiverId == senderId && childData.senderId == receiverId) {
                firebase.database().ref('messages/' + childSnapshot.key).update({ read: true });
            }
        });
        // filter messages by sender and receiver
        let filteredMessages = messages.filter((message) => {
            return (message.senderId == senderId && message.receiverId == receiverId) || (message.senderId == receiverId && message.receiverId == senderId);
        });
        // sort messages by timestamp
        filteredMessages.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });
        // show messages in html with delete button
        document.getElementById('messages').innerHTML = filteredMessages.map((message) => {
            return `<div class="message">
            <div class="message__name">${message.senderName}</div>
            <div class="message__text">${message.message}</div>
            <button class="btn btn-danger" onclick="deleteMessage('${message.id}')">Delete</button>
            </div>`
        }).join('<br/>');
    })
}

function deleteMessage(id) {
    firebase.database().ref('messages/' + id).remove();
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

function lost() {
    const lost = document.getElementById('lost').checked;
    let users = localStorage.getItem("all");
    let alluser = JSON.parse(users);
    console.log("found", found);

    if (lost === true) {
        lost && (result = alluser.filter((item) => item.product_search === "lost"));
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
}

