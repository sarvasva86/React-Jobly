import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="JobList">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
        />
      ))}
    </div>
  );
}

export default JobList;
