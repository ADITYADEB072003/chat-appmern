// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Added missing Firestore imports
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmtxWT1HCb_AzQ_m-qqGb2jwmGj8MrPHk",
  authDomain: "chat-app-2495b.firebaseapp.com",
  projectId: "chat-app-2495b",
  storageBucket: "chat-app-2495b.firebasestorage.app",
  messagingSenderId: "508721938308",
  appId: "1:508721938308:web:42e294c4840f9c5d26a7d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Fixed: added getFirestore import and initialization

const signup = async (username, email, password) => {
    try {
        // Create a new user with email and password
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        // Store user data in the 'users' collection in Firestore
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email: email,
            name: "", // Initialized as empty string
            avatar: "", // Initialized as empty string
            bio: "Hello there! I am using this chat application.", // Default bio text
            lastScene: Date.now(), // Stores current timestamp
        });

        // Create a new entry in the 'chats' collection for the user
        await setDoc(doc(db, "chats", user.uid), {
            chatsData: [] // Initialized with an empty array
        });

        console.log("User created successfully!");
        toast.success("Account created successfully!");
        
    } catch (error) {
        // Log error to console and display a toast notification
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

// Login function (for your Login component)
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

// Logout function
const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Logged out successfully!");
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

// Export the functions
export { auth, db, signup, login, logout };
