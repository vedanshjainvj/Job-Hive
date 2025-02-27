import { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setLocation, setIndustry, setSalary, setSearchedQuery } from '@/redux/jobSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Jobs = () => {
  const { allJobs, location: selectedLocation, industry: selectedIndustry, salary: selectedSalary } = useSelector(
    (store) => store.job
  );
  const [searchedQuery, setSearchedQueryState] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search') || '';
    const locationParam = queryParams.get('location') || '';
    const industryParam = queryParams.get('industry') || '';
    const salaryParam = queryParams.get('salary') || '';

    setSearchedQueryState(search);
    dispatch(setLocation(locationParam));
    dispatch(setIndustry(industryParam));
    dispatch(setSalary(salaryParam));
  }, [location.search, dispatch]);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setSearchedQueryState(searchQuery);
    dispatch(setSearchedQuery(searchQuery));

    const params = new URLSearchParams(location.search);
    if (searchQuery) params.set('search', searchQuery);
    else params.delete('search'); 

    navigate({ search: params.toString() });
  };

  useEffect(() => {
    let filteredJobs = allJobs.filter((job) => {
      return (
        (searchedQuery ? job.title.toLowerCase().includes(searchedQuery.toLowerCase()) : true) &&
        (selectedLocation ? job.location.toLowerCase() === selectedLocation.toLowerCase() : true) &&
        (selectedIndustry ? job.description.toLowerCase() === selectedIndustry.toLowerCase() : true) &&
        (selectedSalary ? job.salary <= selectedSalary : true)
      );
    });
    setFilteredJobs(filteredJobs);
  }, [allJobs, searchedQuery, selectedLocation, selectedIndustry, selectedSalary]);

  return (
    <div className="p-4 md:p-0">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-20">
        {/* Search and filter section */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-5">
          <div className="flex-1 flex md:w-auto">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchedQuery}
              onChange={handleSearchChange}
              className="w-full md:w-64 p-2 border rounded-md hover:border-gray-400 transition-all duration-300"
            />
            <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden ml-2">
              Menu
            </Button>
          </div>
        </div>

        {/* Sidebar for FilterCard */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-white shadow-lg md:hidden">
            <FilterCard />
            <Button onClick={() => setIsSidebarOpen(false)} className="absolute top-2 right-2">Close</Button>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="hidden md:block w-1/5">
            <FilterCard />
          </div>
          <div className="flex-1 h-[88vh] pb-5">
            {filteredJobs.length <= 0 ? (
              <span className="text-gray-700">No jobs found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
