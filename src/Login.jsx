import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginRequest = { email, password };

    try {
      const response = await axios.post(
        "https://springboot-login-util-2.onrender.com/api/login",
        loginRequest
      );

      // If the response status is 200, show success message
      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        setErrorMessage(""); // Clear any previous error message
      }
    } catch (error) {
      // Handle different error cases based on the status code
      if (error.response) {
        // If the response status is 401, display an error message
        if (error.response.status === 401) {
          setErrorMessage("Invalid credentials. Please try again.");
          setSuccessMessage(""); // Clear any previous success message
        } else {
          setErrorMessage("An error occurred on the server. Please try again later.");
          setSuccessMessage(""); // Clear any previous success message
        }
      } else {
        // If the error is not from the backend, it's likely a network issue
        setErrorMessage("Network error. Please check your internet connection.");
        setSuccessMessage(""); // Clear any previous success message
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Display success or error message based on the response */}
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Login;
