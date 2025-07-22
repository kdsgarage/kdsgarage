
const firebaseConfig = {
  apiKey: "AIzaSyCZRKv8dvCHRHU6jZx7jJmgmZiip5VVo0A",
  authDomain: "kds-garage.firebaseapp.com",
  projectId: "kds-garage",
  storageBucket: "kds-garage.appspot.com",
  messagingSenderId: "874166888350",
  appId: "1:874166888350:web:a716571214a7a4193f988f",
  measurementId: "G-WK0Z32CBXM"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

function $(id) { return document.getElementById(id); }

auth.onAuthStateChanged(user => {
  if (user) showDashboard(user);
});

function signup() {
  const email = $("email").value;
  const password = $("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("✅ Signed up successfully"))
    .catch(e => alert("Signup error: " + e.message));
}

function login() {
  const email = $("email").value;
  const password = $("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(userCred => showDashboard(userCred.user))
    .catch(e => alert("Login error: " + e.message));
}

function logout() {
  auth.signOut().then(() => location.reload());
}

function showDashboard(user) {
  document.getElementById("dashboard").innerHTML = `
    <p>Logged in as <strong>${user.email}</strong></p>
    <input type="file" accept="image/*" onchange="uploadImage(event)">
    <div id="garage"><h2>Your Garage</h2><div id="gallery"></div></div>
  `;
  loadImages(user);
}

function uploadImage(event) {
  const file = event.target.files[0];
  const user = auth.currentUser;
  if (!file || !user) return;

  const storageRef = storage.ref(`users/${user.uid}/${file.name}`);
  storageRef.put(file).then(() => {
    alert("✅ Upload complete!");
    loadImages(user);
  }).catch(e => alert("Upload error: " + e.message));
}

function loadImages(user) {
  const gallery = $("gallery");
  gallery.innerHTML = "";
  const ref = storage.ref(`users/${user.uid}`);
  ref.listAll().then(result => {
    result.items.forEach(imageRef => {
      imageRef.getDownloadURL().then(url => {
        const img = document.createElement("img");
        img.src = url;
        gallery.appendChild(img);
      });
    });
  });
}
