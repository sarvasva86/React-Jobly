import React, { useState, useEffect } from 'react';
import JoblyApi from './JoblyApi';  // Assuming this is your API utility
import JobCard from './JobCard';

function JobList() {
  const [jobs, setJobs] = useState([]);

  // Fetch all jobs when the component mounts
  useEffect(() => {
    async function fetchJobs() {
      const data = await JoblyApi.getJobs();
      setJobs(data);
    }

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      <div className="jobs-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
