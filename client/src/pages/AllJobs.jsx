import React, { useContext } from "react";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createContext } from "react";
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllJobsContext = createContext();
function AllJobs() {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer></SearchContainer>
      <JobsContainer></JobsContainer>
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
