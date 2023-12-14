import React from "react";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return null;
};
function AllJobs() {
  const { data } = useLoaderData();
  return (
    <>
      <SearchContainer></SearchContainer>
      <JobsContainer></JobsContainer>
    </>
  );
}

export default AllJobs;
