import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./signin.css";

const logo = "/image/colthifyLogo.png";

function Signin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { userName, password } = user;

    if (!userName.trim() || !password.trim()) {
      alert("Please enter both Username and Password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/user/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials.");
      }

      const data = await response.json();
      console.log("data.profileUrl  ", data.userProfileURl);

      if (!data.token || !data.userID || data.roleID === undefined) {
        throw new Error("Invalid response from server.");
      }
      localStorage.setItem("picUrl",data.userProfileURl);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userID", data.userID);
      localStorage.setItem("RoleID", data.roleID);

      const redirectPath = localStorage.getItem("redirectPath") || "/homepage";
      localStorage.removeItem("redirectPath");

      alert("Sign-in successful!");
      navigate(redirectPath);
    } catch (err) {
      alert("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <img className="mb-4" src={logo} alt="Colthify Logo" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            className="form-control"
            id="floatingUsername"
            placeholder=" " // <- Required for floating to work
            required
          />
          <label htmlFor="floatingUsername">User Name</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
            id="floatingPassword"
            placeholder=" " // <- Also required here!
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>


        <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <button className="btn btn-danger">Bootstrap Red Button</button>
      </form>
    </main>
  );
}

export default Signin;
