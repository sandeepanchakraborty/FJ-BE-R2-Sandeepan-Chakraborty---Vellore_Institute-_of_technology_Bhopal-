import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAYj-ALlqo8cYCjhoUROgwhCJvrBTsbUGk",
  authDomain: "expense-tracker-27612.firebaseapp.com",
  projectId: "expense-tracker-27612",
  storageBucket: "expense-tracker-27612.firebasestorage.app",
  messagingSenderId: "829558953622",
  appId: "1:829558953622:web:781eb73a4dc3149f1494b7",
  measurementId: "G-BX74ZDD03J"
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);

export {app,auth};