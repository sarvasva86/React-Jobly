import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
class JoblyApi {
  static async login(credentials) {
    const res = await this.request("auth/token", credentials, "post");
    return res.token;
  }

  static async signup(newUserData) {
    const res = await this.request("auth/register", newUserData, "post");
    return res.token;
  }

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }
}


  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies */
  static async getCompanies() {
    let res = await this.request("companies");
    return res.companies;
  }

static async updateProfile(username, data) {
  let res = await this.request(`users/${username}`, data, "patch");
  return res.user;
}


  // Make API request
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Get companies with optional search term
  static async getCompanies(searchTerm = '') {
    let res = await this.request('companies', { search: searchTerm });
    return res.companies;
  }

  // Get company by handle
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

// Get all jobs
  static async getJobs() {
    let res = await this.request('jobs');
    return res.jobs;
  }

  // Get jobs for a specific company
  static async getCompanyJobs(handle) {
    let res = await this.request(`companies/${handle}/jobs`);
    return res.jobs;
  }

  // Get company by handle
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company

  
  /** Get a list of jobs */
  static async getJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  /** Apply for a job */
  static async applyToJob(jobId) {
    let res = await this.request(`jobs/${jobId}/apply`, {}, "post");
    return res;
  }

  /** Get details on a user */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user profile */
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "put");
    return res.user;
  }

  static async applyToJob(jobId) {
  let res = await this.request(`jobs/${jobId}/apply`, {}, "post");
  return res.applied; // The backend returns the job ID if the application is successful
}
  

  // More methods can be added here as needed, such as creating jobs, applying, etc.
}

// Example of hardcoded token for development (replace with dynamic token handling)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
