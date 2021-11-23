import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { auth } from './Firebase'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:{},
    }
  }

  //When component is done rendering for the first time
  componentDidMount(){
    this.authListener();
  }

  // If user logs in (if) or out (else) this is called
  authListener() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }


  render() {
    return (
      <BrowserRouter>
        <AppRouter user={this.state.user}/>
      </BrowserRouter>
    );
  }
}

export default App;
