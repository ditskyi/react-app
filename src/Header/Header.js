import React from 'react'
import { auth } from '../Firebase'

class Header extends React.Component {
constructor(props) {
    super(props)
}

LogOut = async() => {

    try {
      await auth.signOut().then(() => {
        this.setState({
         user: null
        });
    }) 
  } catch (error) {
      console.log(error);
    }
}

render() {
    return (
        <div className='header'>
            <button type='submit' className='btn btn-logout' onClick={this.LogOut}>Log out</button>
        </div>
    )
}

}

export default Header