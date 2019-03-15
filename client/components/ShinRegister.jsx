import React from 'react';
import { Link } from 'react-router-dom'

const ShinRegister = props => {
  return (
    <div className='login-box'>
      <form>
        <h3>Register</h3>
        <input type='text' placeholder='username' onChange={(event) => props.updateUsername(event.target.value)} />
        <input type='password' placeholder='password' onChange={(event) => props.updatePassword(event.target.value)} />
        <input type='text' placeholder='Full Name' onChange={(event) => props.updateFullname(event.target.value)} />
        <input type='text' placeholder='Email' onChange={(event) => props.updateEmail(event.target.value)} />
        <button onClick={(e) => {e.preventDefault(); props.registerUser(props.username, props.password, props.fullname, props.email)}}>Submit</button>
        <Link to='/'>Cancel</Link>
      </form>
    </div>
  )
}

export default ShinRegister;