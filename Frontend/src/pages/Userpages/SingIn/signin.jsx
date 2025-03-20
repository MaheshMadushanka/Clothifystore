import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./signin.css";

const logo = "/image/colthifyLogo.png";

function Signin() {
  const navigate = useNavigate(); 
  const [user, setUser] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSignin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { name, password } = user;

    if (name.trim() === "" || password.trim() === "") {
      alert("Enter Username and Password!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/user/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed. Please check your credentials.");
      }

      //  Parse JSON response correctly
      const data = await response.json();
      localStorage.setItem("userID", data.userID);
      localStorage.setItem("authToken", data.token);
      //localStorage.setItem("user", name);

      console.log("Auth Token:", data.token);

      //  Handle Redirect
      const storedRedirectPath = localStorage.getItem("redirectPath");  // Get path if exists
      const redirectPath = storedRedirectPath || "/homepage";  // Default to homepage

      console.log("redirectPath before removal: " + storedRedirectPath);
      localStorage.removeItem("redirectPath"); // Remove after getting it
      console.log("redirectPath after removal: " + redirectPath);
      alert("Sign-in Successful!");
      navigate(redirectPath);
    } catch (error) {
      alert("Login Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSignin}>
        <img className="mb-4" src={logo} alt="Colthify Logo" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="User Name"
          />
          <label>User Name</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <label>Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}

export default Signin;
