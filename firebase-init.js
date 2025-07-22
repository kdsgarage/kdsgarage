
// ✅ Firebase Init - Fixed with correct storageBucket
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
alert("✅ Firebase initialized successfully");
