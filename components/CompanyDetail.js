import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './JoblyApi';

function CompanyDetail() {
  const { handle } = useParams();  // Get the company handle from URL params
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompanyDetail() {
      const companyData = await JoblyApi.getCompany(handle);
      setCompany(companyData);
    }

    fetchCompanyDetail();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Employees:</strong> {company.numEmployees}</p>
      <h2>Jobs at {company.name}</h2>
      {/* Here, you'd map through jobs related to this company, if applicable */}
    </div>
  );
}

export default CompanyDetail;
