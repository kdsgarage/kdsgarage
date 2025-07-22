
function signup() {
  alert("Signup clicked");
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(() => alert("Signed up successfully"))
    .catch((err) => alert("Signup error: " + err.message));
}

function login() {
  alert("Login clicked");
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => alert("Logged in"))
    .catch((err) => alert("Login error: " + err.message));
}

function logout() {
  alert("Logout clicked");
  firebase.auth().signOut()
    .then(() => alert("Logged out"))
    .catch((err) => alert("Logout error: " + err.message));
}
