import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addJobAction } from "./pages/AddJob";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register></Register>,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: (
          <DashboardLayout
            isDarkThemeEnabled={isDarkThemeEnabled}
          ></DashboardLayout>
        ),
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "stats",
            element: <Stats></Stats>,
          },
          {
            path: "all-jobs",
            loader: allJobsLoader,
            element: <AllJobs></AllJobs>,
          },
          {
            path: "profile",
            element: <Profile></Profile>,
          },
          {
            path: "admin",
            element: <Admin></Admin>,
          },
          {
            path: "edit-job/:id",
            element: <EditJob></EditJob>,
            loader: editJobLoader,
            action: editJobAction,
          },
        ],
      },
      {
        path: "login",
        element: <Login></Login>,
        action: loginAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
