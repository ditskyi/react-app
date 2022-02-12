import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { firebaseApp } from './Firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App () {

  const [currentUser, setCurrentUser] = useState([]);

  //When component is done rendering for the first time
  useEffect(() => {
    authListener();
  },[]);

   // If user logs in (if) or out (else) this is called
  function authListener() {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
    } else {
      setCurrentUser(null)
    }
    }); 
  }

  return (
      <BrowserRouter>
        <AppRouter user={currentUser}/>
      </BrowserRouter>
  );
}

export default App;