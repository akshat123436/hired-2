import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import { useAllJobsContext } from "../pages/AllJobs";
import Job from "./Job";
function JobsContainer() {
  const { data } = useAllJobsContext();
  console.log(data);
  const { jobs } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job}></Job>;
        })}
      </div>
    </Wrapper>
  );
}

export default JobsContainer;