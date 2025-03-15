import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import "./signin.css";

const logo = "/image/colthifyLogo.png";

function Signin() {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Show a loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSignin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { email, password } = user;

    if (email.trim() === "" || password.trim() === "") {
      alert("Enter Email and Password!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/user/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed. Please check your credentials.");
        
      }
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
      alert("Sign-in Successful!");
    } catch (error) {
      alert("Login Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSignin}>
        <img className="mb-4" src={logo} alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="name@example.com"
          />
          <label>Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleInputChange}
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
