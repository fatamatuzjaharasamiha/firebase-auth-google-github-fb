import './App.css';
import app from './firebase.init';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({})
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const fbProvider = new FacebookAuthProvider();


  //Sign in
  const handleGoogleSignIn = () => {
    console.log('working')
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user)
      })
      .catch(error => {
        console.error('error', error)
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user
        console.log(user)
        setUser(user)
      })
      .catch(error => {
        console.error(error)
      })
  }
  //sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  }
  const handleFbSignIn = () => {
    signInWithPopup(auth, fbProvider)
      .then(result => {
        const user = result.user
        setUser(user)
        console.log(user)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className="App">
      {/* condition ? true : false */}
      {
        user.email ? <button onClick={handleSignOut}>Sign Out</button> :
          <div>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
            <button onClick={handleFbSignIn}>Facebook sign in</button>
            <button onClick={handleGithubSignIn}>Github Sign in</button>
          </div>

      }
      {/* <button onClick={handleGoogleSignIn}>Google sign in</button>
       <button onClick={handleSignOut}>Sign Out</button> */}
      <h2>Name : {user.displayName}</h2>
      <h3>Email : {user.email}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
