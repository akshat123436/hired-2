import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
// import logo from "../assets/images/logo.svg"
import { Logo } from '../components'
import main from "../assets/images/main.svg"
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <Wrapper>
    <nav>
      <Logo></Logo>
    </nav>
    <div className='container page'>
      {/* info */}
      <div className='info'>
        <h1>
        Hired : The Job <span> Tracking App</span>
        </h1>
        <p>
        Manage your Job applications at one place and get Hired
        </p>
        <Link to='/register' className='btn register-link'>
          Register
        </Link>
        <Link to='/login' className='btn'>
          Login / Demo User
        </Link>
      </div>
      <img src={main} alt='job hunt' className='img main-img' />
    </div>
  </Wrapper>
  )
}

export default Landing;