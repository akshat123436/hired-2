import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Logo, FormRow } from '../components'
function Login() {
  return (
    <Wrapper>
    <form className='form'>
      <Logo />
      <h4>Login</h4>
      <FormRow type='email' name='email' defaultValue='akshat@gmail.com' />
      <FormRow type='password' name='password' defaultValue='elegantSecret' />
      <button type='submit' className='btn btn-block'>
        submit
      </button>
      <button type='button' className='btn btn-block'>
        explore the app
      </button>
      <p>
        Not a member yet?
        <Link to='/register' className='member-btn'>
          Register
        </Link>
      </p>
    </form>
  </Wrapper>
  )
}

export default Login