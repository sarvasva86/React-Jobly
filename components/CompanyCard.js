import React from 'react';
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
  return (
    <div className="company-card">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <Link to={`/companies/${company.handle}`}>View Details</Link>
    </div>
  );
}

export default CompanyCard;
