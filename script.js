
function $(id) {
  return document.getElementById(id);
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    alert("✅ Logged in as " + user.email);
    showDashboard(user);
  } else {
    console.log("User not logged in");
  }
});

function signup() {
  const email = $("email").value;
  const password = $("password").value;
  alert("Signup clicked");
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => alert("✅ Signed up successfully"))
    .catch((error) => alert("Signup error: " + error.message));
}

function login() {
  const email = $("email").value;
  const password = $("password").value;
  alert("Login clicked");
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCred) => {
      alert("✅ Logged in");
      showDashboard(userCred.user);
    })
    .catch((error) => alert("Login error: " + error.message));
}

function logout() {
  firebase.auth().signOut()
    .then(() => {
      alert("Logged out");
      location.reload();
    })
    .catch((error) => alert("Logout error: " + error.message));
}

function showDashboard(user) {
  document.body.innerHTML = `
    <h1>Welcome to KD’S Garage</h1>
    <p>Logged in as <strong>${user.email}</strong></p>
    <button onclick="logout()">Logout</button>
    <div id="garage">
      <h2>Your Garage</h2>
      <p>📸 Upload feature coming next!</p>
    </div>
  `;
}
