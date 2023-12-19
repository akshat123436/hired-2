import React from "react";
import customFetch from "../utils/customFetch.js";
import { useLoaderData } from "react-router-dom";
import { StatsContainer, ChartsContainer } from "../components/index.js";
import { useQuery } from "@tanstack/react-query";

const statsQUery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQUery);
  return null;
};

function Stats() {
  const { data } = useQuery(statsQUery);
  const { defaultStats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
}

export default Stats;
