
function login() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => showGarage()).catch(alert);
}

function signup() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(() => showGarage()).catch(alert);
}

function logout() {
  firebase.auth().signOut().then(() => {
    document.getElementById('garage-section').style.display = 'none';
  });
}

function showGarage() {
  document.getElementById('garage-section').style.display = 'block';
  loadGallery();
  loadLogs();
}

firebase.auth().onAuthStateChanged(user => {
  if (user) showGarage();
});

document.getElementById("imageUpload").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const ref = firebase.storage().ref().child("images/" + file.name);
  await ref.put(file);
  const url = await ref.getDownloadURL();
  const img = document.createElement("img");
  img.src = url;
  document.getElementById("gallery").appendChild(img);
});

function saveLog() {
  const text = document.getElementById("logText").value;
  firebase.firestore().collection("logs").add({
    uid: firebase.auth().currentUser.uid,
    text, created: Date.now()
  });
  document.getElementById("logText").value = "";
  loadLogs();
}

async function loadLogs() {
  const list = document.getElementById("logList");
  list.innerHTML = "";
  const snap = await firebase.firestore().collection("logs")
    .where("uid", "==", firebase.auth().currentUser.uid)
    .orderBy("created", "desc").get();
  snap.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = doc.data().text;
    list.appendChild(li);
  });
}

async function loadGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  const ref = firebase.storage().ref().child("images");
  const list = await ref.listAll();
  for (const item of list.items) {
    const url = await item.getDownloadURL();
    const img = document.createElement("img");
    img.src = url;
    gallery.appendChild(img);
  }
}
