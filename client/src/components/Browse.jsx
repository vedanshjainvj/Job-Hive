import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedQuery } = useSelector((store) => store.job);
  const { allJobs } = useSelector((store) => store.job);

  // Fetch all jobs when component mounts and searchedQuery changes
  useGetAllJobs();

  useEffect(() => {
    if (!searchedQuery) {
      navigate('/');
    }
  }, [searchedQuery, navigate]);

  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchedQuery.toLowerCase())
  );

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery('')); // Clear the search query when component unmounts
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p className='text-gray-700'>No jobs found for the search query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
