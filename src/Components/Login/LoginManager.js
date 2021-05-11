import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.config";

export const initializeLoginframework=()=>{
    if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res=>{
      console.log(res);
      const {displayName,email,photoURL}= res.user;
      const signedInUser= {
        isSignedIn: true,
        userName: displayName,
        email: email,
        image: photoURL,
        success: true
      }
      setAuthToken();
      return signedInUser;
      
    })
    .catch((error)=>{
      console.log(error.message);
    })
  }
  const setAuthToken=()=>{
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      sessionStorage.setItem('token',idToken)
    }).catch(function(error) {

    });
  }

  export const handleSignOut=()=>{
    return firebase.auth().signOut()
    .then(res=>{
      
      const signedOutUser={
        isSignedOut: false,
        userName: '',
        email: '',
        image: ''
      }
      return signedOutUser;
      console.log(res);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  export const signUpWithEmailAndPassword=(username,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo= res.user;
      newUserInfo.error= '';
      newUserInfo.success=true;
      updateUserName(username);
      return newUserInfo; 
    })
    .catch((error) => {
      const newUserInfo= {};
      newUserInfo.error= error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword=(email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const newUserInfo= userCredential.user;
      newUserInfo.error= '';
      newUserInfo.success=true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo= {};
      newUserInfo.error= error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  }

  export const handleFacebookSignIn=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
     
      // The signed-in user info.
      var user = result.user;
      return user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage);
      // ...
    });
  }

   const updateUserName=(userName)=>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: userName,
      photoURL: "https://example.com/jane-q-user/profile.jpg"})
      .then(function() {
        console.log("User name updated successfully");
      }).catch(function(error) {
        console.log(error);
      });
  }