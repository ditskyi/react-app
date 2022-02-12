import React, { useState } from 'react'
import { auth } from '../../Firebase'
import { Redirect } from 'react-router-dom';

function AuthForm() {

  const [userId, setUserId] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  async function authenticateUser() {
    try {
      await auth.signInWithEmailAndPassword(email, password)
        .then(data => { 
          setUserId(data.user.uid);
          setRefreshToken(data.user.refreshToken);
          setIsLogin(true);
        })
    }
      catch (error) {
        switch (error.code) {
            case 'auth/wrong-password':
                alert("You fill wrong password");
                break;
            case 'auth/user-not-found':
                alert("User not found");
                await auth.createUserWithEmailAndPassword(email, password)
                .then(data => { 
                  setUserId(data.user.uid);
                  setRefreshToken(data.user.refreshToken);
                  setIsLogin(true);
                })
                break;
            default:
                alert(error.message)
        }
      }
  }

  function validateForm() {
    let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (password.match(decimal) && email.match(emailFormat))
      return true
    else {return alert("**Fill the right password please!")}
    }

  function submitAuthHandler(event) {
      event.preventDefault();
      if (validateForm()) {
        return  authenticateUser();
      } 
      else if (isLogin) {
      <Redirect to="/todos"></Redirect>
      }
  }

  return (
    <form className='auth-form' onSubmit={submitAuthHandler}>
      <h3>Welcome!</h3>
      <label>
          <p>Email</p>
          <input type='email' className='auth-form-login-input' value={email} onChange={email => setEmail(email.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input 
          type="password"
          title="Must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" 
          className='auth-form-login-input' 
          value={password} 
          onChange={pas => setPassword(pas.target.value)}/>
        </label>
        <div>
          <button type="submit" className='auth-form-btn'>Login</button>
        </div>
    </form>
  )
}

export default AuthForm