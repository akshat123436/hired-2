import React from "react";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer.js";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import StatItem from "../components/StatItem.jsx";
export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

function Admin() {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling></FaSuitcaseRolling>}
      ></StatItem>
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8"
        icon={<FaCalendarCheck></FaCalendarCheck>}
      ></StatItem>
    </Wrapper>
  );
}

export default Admin;
