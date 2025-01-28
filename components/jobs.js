// Example backend (Node/Express) route for getting all jobs
app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();  // Get all jobs from the database
  res.json({ jobs });
});

// Example backend (Node/Express) route for getting jobs by company handle
app.get('/companies/:handle/jobs', async (req, res) => {
  const { handle } = req.params;
  const jobs = await Job.find({ companyHandle: handle });  // Get jobs for a specific company
  res.json({ jobs });
});
