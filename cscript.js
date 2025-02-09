// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOvhP7vmznCRV9Ur7JX8jzzxbyLtQ3g1Y",
  authDomain: "chat-app-2451.firebaseapp.com",
  projectId: "chat-app-2451",
  storageBucket: "chat-app-2451.firebasestorage.app",
  messagingSenderId: "349901432256",
  appId: "1:349901432256:web:889835cbfba4aaa7079425",
  measurementId: "G-19R6NWZC65"
};

// Kiểm tra nếu có username trước đó
window.onload = function() {
    if (localStorage.getItem("username")) {
        document.getElementById("register-container").style.display = "none";
        document.getElementById("chat-app").style.display = "flex";
    }
};

// Lưu username vào localStorage
function saveUsername() {
    let username = document.getElementById("username").value.trim();
    if (username) {
        localStorage.setItem("username", username);
        document.getElementById("register-container").style.display = "none";
        document.getElementById("chat-app").style.display = "flex";
    }
}

// Gửi tin nhắn
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, 'user-message');
    userInput.value = "";
}

function addMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Nhấn Enter để gửi tin nhắn
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Quản lý danh sách bạn bè
let friends = JSON.parse(localStorage.getItem('friends')) || [];

function addFriend() {
    let name = document.getElementById("friend-name").value.trim();
    if (name && !friends.includes(name)) {
        friends.push(name);
        localStorage.setItem('friends', JSON.stringify(friends));
        document.getElementById("friend-name").value = "";
        displayFriends();
    }
}

function displayFriends() {
    let list = document.getElementById("friend-list");
    list.innerHTML = "";
    friends.forEach(name => {
        let div = document.createElement("div");
        div.textContent = name;
        div.classList.add("friend");
        div.onclick = () => openChat(name);
        list.appendChild(div);
    });
}

function searchFriends() {
    let query = document.getElementById("search").value.toLowerCase();
    let filtered = friends.filter(name => name.toLowerCase().includes(query));
    let list = document.getElementById("friend-list");
    list.innerHTML = "";
    filtered.forEach(name => {
        let div = document.createElement("div");
        div.textContent = name;
        div.classList.add("friend");
        div.onclick = () => openChat(name);
        list.appendChild(div);
    });
}

function openChat(name) {
    chatBox.innerHTML = `<h3>Chat with ${name}</h3>`;
}
