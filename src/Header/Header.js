import React from 'react'
import { auth } from '../Firebase'

function Header({ user }) {
    async function LogOut() {
        try {
          await auth.signOut().then(() => {
            user = null;
        }) 
      } catch (error) {
          console.log(error);
        }
    }
    return (
        <div className='header'>
            <button type='submit' className='btn btn-logout' onClick={LogOut}>Log out</button>
        </div>
    )
}
export default Header