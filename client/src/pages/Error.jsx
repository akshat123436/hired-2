import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage.jsx';
import img from "../assets/images/not-found.svg";
function Error() {
  const error = useRouteError();
  console.log(error);
  if(error.status === 404){
    return(
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Couldn't find the page you are looking for</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to='/dashboard'>back home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
    <div><h3>Something Went Wrong</h3></div>
    </Wrapper>
  )
}

export default Error;