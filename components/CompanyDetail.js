import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';

function CompanyDetail() {
  const { handle } = useParams();  // Get the company handle from URL params
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchCompanyDetail() {
      const companyData = await JoblyApi.getCompany(handle);
      setCompany(companyData);

      const jobsData = await JoblyApi.getCompanyJobs(handle);  // Fetch jobs for this company
      setJobs(jobsData);
    }

    fetchCompanyDetail();
  }, [handle]);

  if (!company) return <p>Loading company...</p>;
  if (!jobs) return <p>Loading jobs...</p>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <h2>Jobs at {company.name}</h2>
      <div className="jobs-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default CompanyDetail;
