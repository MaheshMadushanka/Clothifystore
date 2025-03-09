import React, { useState } from "react";
import "./signin.css";

const logo = "/image/colthifyLogo.png";

function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSignin = async (event) => {
    event.preventDefault();
    const { email, password } = user;

    if (email.trim() === "") {
      alert("Enter Email!");
      return;
    }
    if (password.trim() === "") {
      alert("Enter Password!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/user/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      alert("Sign-in Successful!");
    } catch (error) {
      alert("Login Error: " + error.message);
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form>
        <img className="mb-4" src={logo} alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handleInputChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleSignin}>
          Sign in
        </button>
      </form>
    </main>
  );
}

export default Signin;
