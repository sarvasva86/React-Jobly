import React, { useState, useEffect } from 'react';
import JoblyApi from './JoblyApi';  // Assuming this is your API utility
import CompanyCard from './CompanyCard';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch companies when the component mounts or search term changes
  useEffect(() => {
    async function fetchCompanies() {
      const data = await JoblyApi.getCompanies(searchTerm);
      setCompanies(data);
    }

    fetchCompanies();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Companies</h1>
      <input
        type="text"
        placeholder="Search companies"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="companies-list">
        {companies.map((company) => (
          <CompanyCard key={company.handle} company={company} />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
