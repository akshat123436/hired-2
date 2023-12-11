import React from "react";
import { FaAlignLeft } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Navbar";
import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
function Navbar() {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggleSidebar}>
          <FaAlignLeft></FaAlignLeft>
        </button>
        <div>
          <Logo></Logo>
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle></ThemeToggle>
          <LogoutContainer></LogoutContainer>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
