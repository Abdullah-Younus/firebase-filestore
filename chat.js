const firebaseConfig = {
    apiKey: "AIzaSyA002LsdsULgeS4oDzmJ8ckFg10_7UdNxQ",
    authDomain: "test-d3ff6.firebaseapp.com",
    databaseURL: "https://test-d3ff6-default-rtdb.firebaseio.com/",
    projectId: "test-d3ff6",
    storageBucket: "test-d3ff6.appspot.com",
    messagingSenderId: "620970481245",
    appId: "1:620970481245:web:daaba434f907f09e38dfb4",
    measurementId: "G-ERP7EDK9VF",
    storageBucket: "test-d3ff6.appspot.com",
};

firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
const db = firebase.database();

var myName = prompt("Enter your name");



function sendMessage() {
    // get message
    var message = document.getElementById("message").value;
    // save in database
    firebase.database().ref("messages").push().set({
        "sender": myName,
        "message": message
    });
    // prevent form from submitting
    return false;
}

firebase.database().ref("messages").on("child_added", function (snapshot) {
    console.log(snapshot.key);
    // give each message a unique ID
    var html = "";
    html += "<li id='message-" + snapshot.key + "'>";
    // show delete button if message is sent by me
    if (snapshot.val().sender == myName) {
        html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
        html += "Delete";
        html += "</button>";
    }
    html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</li>";

    document.getElementById("messages").innerHTML += html;
});



// document.getElementById("message-form").addEventListener("submit", sendMessage);

// function sendMessage(e) {
//     e.preventDefault();

//     // get values to be submitted
//     const timestamp = Date.now();
//     const messageInput = document.getElementById("message-input");
//     const message = messageInput.value;

//     // clear the input box
//     messageInput.value = "";

//     //auto scroll to bottom
//     document
//         .getElementById("messages")
//         .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

//     // create db collection and send in the data
//     db.ref("messages/" + timestamp).set({
//         username,
//         message,
//     })


// }
// const fetchChat = db.ref("messages/");

// fetchChat.on("child_added", function (snapshot) {
//     console.log('SnapShot', snapshot);
//     const users = localStorage.getItem('userData');
//     const user = JSON.parse(users);
//     console.log('User Check', user);
//     for (let i = 0; i < user.length; i++) {
//         if (user[i].name == username) {
//             const messages = snapshot.val();
//             console.log('Message:', messages);
//             const message = `<li class=${username === messages.username ? "sent" : "receive"
//                 }><span>${messages.username}: </span>${messages.message}</li>`;
//             document.getElementById("messages").innerHTML += message;
//         }
//         else {
//             break;
//         }
//     }
// });