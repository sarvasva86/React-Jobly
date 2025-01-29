import React, { useState, useContext } from "react";
import JoblyApi from "./api";
import UserContext from "./UserContext";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    password: "",
  });

  const [message, setMessage] = useState(null);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let updatedUser;

    try {
      updatedUser = await JoblyApi.updateProfile(currentUser.username, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      setCurrentUser(updatedUser);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err[0]);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <div className="ProfileForm">
      <h2>Edit Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} />

        <label>Last Name:</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} />

        <label>Email:</label>
        <input name="email" value={formData.email} onChange={handleChange} />

        <label>Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;
