import React, { useState, useEffect } from "react";
import "./login.css";
import { useLocation, useNavigate } from "react-router-dom";

const logo = "/image/colthifyLogo.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const RoleID = localStorage.getItem("RoleId"); // Get role from local storage
  console.log("RoleID  ",RoleID)
  const isAdmin = RoleID === "1"; 

  const [user, setUser] = useState({
    userName: "",
    password: "",
    userEmail: "",
    userAddress: "",
    userNumber: "",
    role: isAdmin ? "0" : "", // Default role as user unless admin sets otherwise
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "role" && !isAdmin ? "0" : value, // Prevent normal users from setting role
    }));
  };

  async function sendForm(event) {
    event.preventDefault();

    if (!isAdmin && user.role === "1") {
      alert("You do not have permission to assign admin role.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/user/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("User added successfully!");
        setUser({
          userName: "",
          password: "",
          userEmail: "",
          userAddress: "",
          userNumber: "",
          role: isAdmin ? "0" : "",
        });

        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);
      } else {
        alert("Failed to add user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form className="form-signin w-200 m-auto mb-10">
      <img className="mb-4" src={logo} alt="Logo" width="72" height="57" />
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="userName"
          name="userName"
          placeholder="Username"
          value={user.userName}
          onChange={handleChange}
          required
        />
        <label htmlFor="userName">Username</label>
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
      </div>

      {isAdmin && (
        <div className="form-floating">
          <select
            className="form-control"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="0">User</option>
            <option value="1">Admin</option>
          </select>
          <label htmlFor="role">Role</label>
        </div>
      )}

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="userEmail"
          name="userEmail"
          placeholder="Email"
          value={user.userEmail}
          onChange={handleChange}
          required
        />
        <label htmlFor="userEmail">Email</label>
      </div>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="userAddress"
          name="userAddress"
          placeholder="Address"
          value={user.userAddress}
          onChange={handleChange}
        />
        <label htmlFor="userAddress">Address</label>
      </div>

      <div className="form-floating">
        <input
          type="tel"
          className="form-control"
          id="userNumber"
          name="userNumber"
          placeholder="Phone Number"
          value={user.userNumber}
          onChange={handleChange}
        />
        <label htmlFor="userNumber">Phone Number</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary" onClick={sendForm} type="submit">
        Sign in
      </button>
      <p className="mt-3">
        Already have an account?{" "}
        <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/signin")}>
          Sign in here
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
