import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCNx7TnEj8XuRPkUespcULgLm75zQ6wxGo",
    authDomain: "ecom-db-40ca1.firebaseapp.com",
    databaseURL: "https://ecom-db-40ca1.firebaseio.com",
    projectId: "ecom-db-40ca1",
    storageBucket: "ecom-db-40ca1.appspot.com",
    messagingSenderId: "292880761666",
    appId: "1:292880761666:web:7bdde1c03764c0072efedb"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get(); 

    if(!snapShot.exists){
      const { displayName, email } = userAuth;  
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error){
        console.log('Error creating user', error.message);
        
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;