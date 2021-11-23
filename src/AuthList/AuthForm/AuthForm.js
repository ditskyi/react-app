import React from 'react'
import { auth } from '../../Firebase'
import { Redirect } from 'react-router-dom';

class AuthForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLogin: false,
          email: '',
          password: '',
          userId: null,
          refreshToken: null
      };
  }

  authenticateUser = async () => {
      try {
        await auth.signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(data => { this.setState({
            userId: data.user.uid,
            refreshToken: data.user.refreshToken,
            isLogin: true
          })})
      }
        catch (error) {
          switch (error.code) {
              case 'auth/wrong-password':
                  alert("You fill wrong password");
                  break;
              case 'auth/user-not-found':
                  alert("User not found");
                  await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                  .then(data => { this.setState({
                    userId: data.user.uid,
                    refreshToken: data.user.refreshToken,
                    isLogin: true
                  })})
                  break;
              default:
                  alert(error.message)
          }
        }
  }

  validateForm = () => {
    let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.password.match(decimal) && this.state.email.match(emailFormat))
    return true
    else {return alert("**Fill the right password please!")}
    }

  submitAuthHandler = (event) => {
      event.preventDefault();
      if (this.validateForm()) {
        return  this.authenticateUser()
      } 
      else
      if (this.state.isLogin) {
      <Redirect to="/todos"></Redirect>
      }
  }


  render() {

      return (
          <form className='auth-form' onSubmit={this.submitAuthHandler}>
            <h3>Welcome!</h3>
            <label>
                <p>Email</p>
                <input type='email' className='auth-form-login-input' value={this.state.email} onChange={email => this.setState({email: email.target.value})}/>
              </label>
              <label>
                <p>Password</p>
                <input 
                type="password"
                title="Must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" 
                className='auth-form-login-input' 
                value={this.state.password} 
                onChange={pas => this.setState({password: pas.target.value})}/>
              </label>
              <div>
                <button type="submit" className='auth-form-btn' >Login</button>
              </div>
          </form>
      )
  }
  
}

export default AuthForm