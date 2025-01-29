import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import JoblyApi from "./api";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
      } catch (err) {
        console.error("Error fetching company details:", err);
      }
    }
    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <div className="CompanyDetail-jobs">
        {company.jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
          />
        ))}
      </div>
    </div>
  );
}

export default CompanyDetail;
