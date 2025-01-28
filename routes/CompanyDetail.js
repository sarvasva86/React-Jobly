import React from 'react';
import { useParams } from 'react-router-dom';

function CompanyDetail() {
  const { handle } = useParams();

  return (
    <div>
      <h1>Company: {handle}</h1>
      <p>Details of the company will appear here.</p>
    </div>
  );
}

export default CompanyDetail;
