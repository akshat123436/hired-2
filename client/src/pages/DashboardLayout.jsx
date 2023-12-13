import React, { createContext, useContext, useState } from "react";
import { BigSidebar, SmallSidebar, Navbar } from "../components";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const DashboardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

function DashboardLayout({ isDarkThemeEnabled }) {
  const navigate = useNavigate();
  const { user } = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setisDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setisDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logged out successfully");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar></SmallSidebar>
          <BigSidebar></BigSidebar>
          <div>
            <Navbar>
              <div className="dashboard-page">
                <Outlet context={{ user }} />
              </div>
            </Navbar>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
