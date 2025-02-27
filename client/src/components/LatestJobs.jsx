import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-xl sm:text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {allJobs?.slice(0, 6).map((job) => (
          <div
            key={job._id}
            className="transition-transform duration-300 hover:scale-105"
          >
            <LatestJobCards job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
