import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import { handleFacebookSignIn, handleGoogleSignIn, handleSignOut, initializeLoginframework, signInWithEmailAndPassword, signUpWithEmailAndPassword } from './LoginManager';

initializeLoginframework();

function Login() {
const [loggedInUser,setLoggedInUser]= useContext(UserContext);
let history = useHistory();
  let location = useLocation();
  

  let { from } = location.state || { from: { pathname: "/" } };
  const [newUser,setNewUser]= useState(false);
  const [user,setUser]=useState({
    isSignedIn: false,
    userName: '',
    email: '',
    image: '',
    error: '',
    success: false
  })
 
  
  const googleSignIn=()=>{
      handleGoogleSignIn()
      .then(res=>{
          setLoggedInUser(res);
          setUser(res);
          history.replace(from);
      })
  }
  const signOut=()=>{
      handleSignOut()
      .then(res=>{
        setLoggedInUser(res);
        setUser(res);
        history.replace(from);
      })
  }
  const facebookLogin=()=>{
      handleFacebookLogin()
      .then(res=>{
        setLoggedInUser(res);
        setUser(res);
        history.replace(from);
      })
  }
  

  const handleSubmit=(e)=>{
    if(newUser && user.email && user.password){
        signUpWithEmailAndPassword(user.userName,user.email,user.password)
        .then(res=>{
            setLoggedInUser(res);
            setUser(res);
            history.replace(from);
        })

    }
    if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email,user.password)
        .then(res=>{
            setLoggedInUser(res);
            setUser(res);
            history.replace(from);
        })
    }
    e.preventDefault();
  }
   
  const handleBlur=(e)=>{
    let isValidated= true;
    if(e.target.name==='email'){
      const re= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValidated= re.test(e.target.value);
    }
    if(e.target.name==='password'){
       isValidated=e.target.value.length >6;
      
    }
    if(isValidated){
      const newUser= {...user};
      newUser[e.target.name]=e.target.value;
      setUser(newUser)
    }
  }
  
  const handleFacebookLogin=()=>{
    handleFacebookSignIn()
    .then(res=>{
        setLoggedInUser(res);
        setUser(res);
        history.replace(from);
    })

  }
  
  return (
    <div style={{marginTop: '15vh'}} className="container w-50">
    <div className="text-center">
      {user.isSignedIn ? (
        <button className="btn btn-danger" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button className="btn btn-warning mb-4" onClick={googleSignIn}>
          Log in using Google
        </button>
      )} <br />
      <button className="btn btn-warning" onClick={facebookLogin}>
        Log in using Facebook
      </button>
      {user.isSignedIn && (
        <div>
          <h2>{user.userName}</h2>
          <h3>{user.email}</h3>
          <img src={user.image} alt="" />
        </div>
      )}
      <h1>Let us know who you are!</h1>
      <input
        className="form-check-input"
        type="checkbox"
        name="newUser"
        onChange={() => setNewUser(!newUser)}
      />
      <label className="form-check-label" htmlFor="newUser">
        Sign Up
      </label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            className="form-control"
            type="text"
            onBlur={handleBlur}
            name="userName"
            placeholder="Enter your name"
          />
        )} <br />
        <input
          className="form-control"
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Enter your email"
          required
        />{' '}
        <br />
        <input
          className="form-control"
          type="password"
          name="password"
          onBlur={handleBlur}
          id=""
          placeholder="Enter your password"
          required
        />{' '}
        <br />
        <input
          className="btn btn-primary"
          type="submit"
          value={newUser ? 'Sign Up' : 'Sign In'}
        />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && (
        <p style={{ color: 'green' }}>
          User is {newUser ? 'Registered' : 'Logged In'} successfully
        </p>
      )}
    </div>
  </div>
  
  );
}

export default Login;
