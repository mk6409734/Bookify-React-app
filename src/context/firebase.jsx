import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth";
import {getFirestore, collection, addDoc, getDocs, getDoc, doc, query, where} from "firebase/firestore"
import {getStorage ,ref, uploadBytes, getDownloadURL} from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyB79fElC30sATHpIA3Nh3KtZ2vem8msPRg",
    authDomain: "bookify-268aa.firebaseapp.com",
    projectId: "bookify-268aa",
    storageBucket: "bookify-268aa.appspot.com",
    messagingSenderId: "486672430170",
    appId: "1:486672430170:web:e2083e200080a0a530d463"
  };

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const GoogleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
    const [user,  setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if(user) setUser(user);
            else setUser(null);
        });
    }, [])
        

    const signupUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password);

    const signupUserWithEmailAndPass = (email, password) =>
        signInWithEmailAndPassword(firebaseAuth, email, password);
    
    const signinWithGoogle = () => signInWithPopup(firebaseAuth, GoogleProvider);
   

    const handleCreateNewListing = async (name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef, cover);
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbn,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,

        });
    };

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books"));
    };

    const getBookById = async (id) => {
        const docRef = doc(firestore, 'books', id);
        const result = await getDoc(docRef);
        return result;
    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path)); 
    };

    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(firestore, "books", bookId, "order")
        const result = await addDoc(collectionRef, {
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty),

        });
        return result;
    }

    const fetchMyBooks = async (userId) => {
        const collectionsRef = collection(firestore, 'books');
        const q = query(collectionsRef, where("userID", "==", userId))
        const result = await getDocs(q);
        return result;
    }

    const getOrders = async(bookId) => {
        const collectionRef = collection(firestore, 'books', bookId, 'order');
        const result = await getDocs(collectionRef)
        return result;

    }


    const isLoggedIn = user ? true : false;

    return (
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword,signupUserWithEmailAndPass, signinWithGoogle, isLoggedIn, handleCreateNewListing, listAllBooks, getImageURL, getBookById, placeOrder, fetchMyBooks, user, getOrders}}>{props.children}</FirebaseContext.Provider>
    )
}