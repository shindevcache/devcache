import React from 'react';
import { Link } from "react-router-dom";
import ShinRegister from './ShinRegister.jsx'

const ShinLogin = props => {
  return (

    <div className='login-box'>
    <h3>SHIN devCache</h3>
      <form>
        <input type='text' placeholder='username' onChange={(event) => props.updateUsername(event.target.value)} />
        <input type='password' placeholder='password' onChange={(event) => props.updatePassword(event.target.value)} />
        <button onClick={(e) => {e.preventDefault(); props.loginUser(props.username, props.password)}}>Login</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  )
}

export default ShinLogin;