import React, { createContext, useContext, useEffect, useState } from "react";
import { BigSidebar, SmallSidebar, Navbar, Loading } from "../components";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

const DashboardContext = createContext();

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

function DashboardLayout({ isDarkThemeEnabled, queryClient }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const { user } = useQuery(userQuery).data;
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setisDarkTheme] = useState(isDarkThemeEnabled);
  const [isAuthError, setIsAuthError] = useState(false);
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
    queryClient.invalidateQueries();
    toast.success("Logged out successfully");
  };
  customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);
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
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? (
                <Loading></Loading>
              ) : (
                <Outlet context={{ user }} />
              )}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
