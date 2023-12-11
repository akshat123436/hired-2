import React from 'react'
import { Outlet } from 'react-router-dom'
Outlet
function HomeLayout() {
  return (
    <div>
    {/* <div>HomeLayout</div> */}
    <Outlet></Outlet>
    </div>
  )
}

export default HomeLayout