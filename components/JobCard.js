import React, { useState, useEffect } from 'react';
import JoblyApi from './JoblyApi';  // Assuming this is your API utility
import JobCard from './JobCard';
import UserContext from "./UserContext";

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



function JobCard({ id, title, salary, equity }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [applied, setApplied] = useState(currentUser.applications.includes(id));

  async function handleApply() {
    if (applied) return;

    try {
      await JoblyApi.applyToJob(id);
      setApplied(true);

      // Update the current user's applications in context
      setCurrentUser((user) => ({
        ...user,
        applications: [...user.applications, id],
      }));
    } catch (err) {
      console.error("Error applying to job:", err);
    }
  }

  return (
    <div className="JobCard">
      <h3>{title}</h3>
      <p>Salary: {salary ? `$${salary.toLocaleString()}` : "N/A"}</p>
      <p>Equity: {equity || "N/A"}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}
export default JobCard;

