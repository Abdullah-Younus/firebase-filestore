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
            querySnapshot?.forEach((doc) => {
                let user = doc.data();
                user.id = doc.id;
                allformData.push(user);
            });
            allPosts(allformData)
            localStorage.setItem("all", JSON.stringify(allformData));
            // console.log('All Data Get', allformData);
        });
    } catch (error) {
        console.log(error);
    }
}

function allPosts(user) {
    try {
        user?.forEach((post) => {
            console.log('Ya Wala OBJ SEBDER', post);
            document.getElementById('card').innerHTML += `
            <div style="border: 2px solid grey; height: 400px; display: flex; flex-direction: column; align-items: center;border-radius: 20px;">
                <div style="padding:5px;margin:5px">
                    <a href="./cardDetails.html?${post.id}" style="text-decoration:none;color:black;display: flex;align-items: center;flex-direction: column;width:300px;">
                        <img src="${post.img}" style="width:300px;height:200px;border-radius:20px;" />
                        <h3>Title:${post.txt_field}</h3>
                        <div style="font-size: 12px; color: grey;display:flex;justify-content:space-between;width:300px;">
                            <h4>Status:${post.product_search}</h4>
                            <h4>Posted By:${post.user}</h4>
                        </div>
                    </a>  
                </div>
                <div style="display:flex;justify-content:space-evenly;cursor: pointer;">  
                    <button style="cursor: pointer; margin-right: 20px;padding: 10px 20px; border-radius: 20px;color: white; background-color: darkgreen;" type="button" onclick="return handleMessage('./message.html'+'?'+'${post.userId}','${post.userId}')">Message</button>
                    <button style="cursor: pointer;padding: 10px 20px; border-radius: 20px;color: white; background-color: red;" type="button" onclick="return deletePost('${post.id}')">Delete</button>
                </div>
            </div>
                `
        })

    } catch (error) {
        console.log(error);
    }

    // console.log('Funcrion ', user);
    // console.log('All Data Get', allformData);
    // let posts = localStorage.getItem("all");
    // let postsData = JSON.parse(posts);
    // console.log('All Data', postsData);

    // postsData.forEach((post) => {
    //     console.log('Ya Wala OBJ SEBDER', post);
    //     document.getElementById('card').innerHTML += `
    //     <a href="./cardDetails.html?${post.id}" style="text-decoration:none;margin-left:100px;color:black; ">
    //         <div style="display: flex;align-items: center;flex-direction: column;width:25%;height:400px;padding:5px;margin:5px"> 
    //             <img src="${post.img}" style="width:300px;height:200px;border-radius: 20px;" />
    //             <br/>   
    //             <label style="width: 190px;">Title field:${post.txt_field}</label>
    //             <label style="width: 200px;">Product Search:${post.product_search}</label>
    //             <label style="width: 200px;"><b>Posted By:${post.user}</b></label>
    //             <button type="button" onclick="return handleMessage('./message.html'+'?'+'${post.userId}','${post.userId}')">Message</button>
    //             <button type="button" onclick="return deletePost('${post.id}')">Delete</button>
    //         </div>
    //     </a>    
    //     `
    // })
}

function handleMessage(url, id) {
    // update read status
    firebase.database().ref('messages').on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().id === id) {
                firebase.database().ref('messages/' + childSnapshot.key).update({
                    read: true
                })
            }
        })
    })

    console.log('ID CHECK', id);
    console.log('URL ', url);
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
    const lost = document.getElementById('lost').checked;

    // get posts from local storage and filter by found or lost
    let posts = localStorage.getItem("all");
    let allposts = JSON.parse(posts);
    let filteredPosts = allposts.filter((post) => {
        return (found && !lost && post.product_search === 'found') || (!found && lost && post.product_search === 'lost') || (!found && !lost);

    });
    console.log("check response -> filtered posts", filteredPosts);

    document.getElementById('card').innerHTML = '';

    filteredPosts.forEach((post) => {
        document.getElementById('card').innerHTML += `
        <div style="border: 2px solid grey; height: 400px; display: flex; flex-direction: column; align-items: center;border-radius: 20px;">
            <div style="padding:5px;margin:5px">
                <a href="./cardDetails.html?${post.id}" style="text-decoration:none;color:black;display: flex;align-items: center;flex-direction: column;width:300px;">
                    <img src="${post.img}" style="width:300px;height:200px;border-radius:20px;" />
                    <h3>Title:${post.txt_field}</h3>
                    <div style="font-size: 12px; color: grey;display:flex;justify-content:space-between;width:300px;">
                        <h4>Status:${post.product_search}</h4>
                        <h4>Posted By:${post.user}</h4>
                    </div>
                </a>  
            </div>
            <div style="display:flex;justify-content:space-evenly;cursor: pointer;">  
                <button style="cursor: pointer; margin-right: 20px;padding: 10px 20px; border-radius: 20px;color: white; background-color: darkgreen;" type="button" onclick="return handleMessage('./message.html'+'?'+'${post.userId}','${post.userId}')">Message</button>
                <button style="cursor: pointer;padding: 10px 20px; border-radius: 20px;color: white; background-color: red;" type="button" onclick="return deletePost('${post.id}')">Delete</button>
            </div>
        </div>
            `
    })
}

// let result = [];
function getNewMessages() {
    let user = localStorage.getItem("currentUser");
    let currentUser = JSON.parse(user);

    firebase.database().ref('messages').on('value', (snapshot) => {
        const messages = snapshot.val();
        const filteredMessages = Object.keys(messages).map((key) => {
            return messages[key];
        }).filter((message) => {
            return (message.receiverId == currentUser.id && message.read === false);
        });

        // filter messages groupby senderId and count them
        let groupedMessages = filteredMessages.reduce((r, a) => {
            r[a.senderId] = [...r[a.senderId] || [], a];
            return r;
        }, {});

        // group messages by senderId and count them
        let groupedMessagesCount = Object.keys(groupedMessages).map((key) => {
            return {
                senderId: key,
                senderName: groupedMessages[key][0].senderName,
                count: groupedMessages[key].length
            }
        });

        console.log("groupedMessagesCount: ", groupedMessagesCount);
        // showUsers(groupedMessagesCount);

        // console.log('notificationData: ', notificationData);
        document.getElementById('usersList').innerHTML = "";

        // console.log("finalUsers: ", finalUsers);
        groupedMessagesCount.forEach((user) => {
            document.getElementById('usersList').innerHTML += `
                        <div class="user" onclick="handleMessage('./message.html'+'?'+'${user.senderId}','${user.senderId}')" style="display: flex; justify-content: space-between; align-items: center;">
                            <h5>${user.senderName}</h5>
                            <p>${user.count}</p>
                        </div>`
        });
    })
}

// show users List
function showUsers() {
    let users = localStorage.getItem("userData");
    let allUsers = JSON.parse(users);

    // append users to usersList innerHTML
    allUsers?.forEach((user) => {
        document.getElementById('allUsers').innerHTML += `
            <div class="user" onclick="handleMessage('./message.html'+'?'+'${user.id}','${user.id}')">
                <p>${user.name}</p>
            </div>`
    });
}

// delete from firebase firestore

function deletePost(id) {
    console.log('id: ', id);

    firebase.firestore().collection('createform').doc(id).delete().then(() => {
        console.log('Document successfully deleted!');
        let posts = localStorage.getItem("all");
        let allposts = JSON.parse(posts);
        let filteredPosts = allposts.filter((post) => {
            return post.id !== id;
        });
        localStorage.setItem("all", JSON.stringify(filteredPosts));
        window.location.reload();
    }).catch((error) => {
        console.error('Error removing document: ', error);
    });


}


// details page Card
function detailPosts() {
    var url = document.URL;
    var url_array = url.split('?') // Split the string into an array with / as separator
    var receiverId = url_array[url_array.length - 1];
    console.log('receiverId', receiverId);
    let posts = localStorage.getItem("all");
    let postsData = JSON.parse(posts);
    console.log('All Data', postsData);
    let filterpost = postsData.find((post) => post.id === receiverId)
    console.log('Filter Post :', filterpost);
    document.getElementById('product_img').src = filterpost.img;
    document.getElementById('title').innerHTML = "Title :" + filterpost.title_item;
    document.getElementById('title_field').innerHTML = "Title Item:" + filterpost.txt_field;
    document.getElementById('product_found').innerHTML = "Product :" + filterpost.product_search;
    document.getElementById('Description').innerHTML = filterpost.des_item;
    document.getElementById('User').innerHTML = "Posted By :" + filterpost.user;
}

// Initialize and add the map User upper pass kiya han getallData kae function ma
function initMap() {
    let posts = localStorage.getItem("all");
    let postsData = JSON.parse(posts);
    var url = document.URL;
    var url_array = url.split('?') // Split the string into an array with / as separator
    var receiverId = url_array[url_array.length - 1];
    console.log('initMap Check ', postsData);
    let filterpost = postsData.find((post) => post.id === receiverId);
    console.log('filterpost :', filterpost.position);
    // let position = postsData.map((item) => item.position);


    // console.log('position', position);



    // The location of Uluru
    const uluru = { lat: filterpost.position.lat, lng: filterpost.position.lng };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}