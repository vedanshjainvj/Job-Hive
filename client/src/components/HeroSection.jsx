import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full border bg-gray-100 text-[#F83002] font-medium hover:text-[#ff4f28] hover:border-slate-300">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-xl sm:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white pt-4 text-center">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="my-6  text-lg md:text-xl tracking-tight text-gray-800 dark:text-gray-400 text-balance translate-y-[-1rem] animate-fade-in z-[1] [--animation-delay:400ms] text-center leading-relaxed">
          JobHive: Connecting candidates to dream jobs and recruiters to top
          talent with seamless applications and powerful hiring tools.
        </p>

        <div className="flex shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto   focus-within:ring-secondary dark:focus-within:ring-gray-500 transition duration-200 ease-linear">
          <input
            type="text"
            placeholder="Your dream job"
            className="outline-none border-none w-full text-gray-900 dark:text-gray-800 font-semibold text-lg bg-transparent px-4 py-3 rounded-full whitespace-nowrap"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchJobHandler}
            className="rounded-r-full text-lg bg-[#6A38C2] text-white px-6  h-[52px] flex items-center justify-center font-semibold transition duration-200 ease-in-out hover:bg-[#5a2ea5]"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
