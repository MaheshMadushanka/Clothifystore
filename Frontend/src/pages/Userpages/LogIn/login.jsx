import React, { useState } from 'react';
import './login.css';
import { useLocation, useNavigate } from 'react-router-dom';

const logo = '/image/colthifyLogo.png';


const LoginForm = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const [user, setUser] = useState({
    userName: '',
    password: '',
    userEmail: '',
    userAddress: '',
    userNumber: '',
    role: 0,
  });

 const handleChange=(event) =>{
    const {name, value}= event.target;
    setUser({...user, [name]:value});

 }



 async function sendForm(event)  {
  event.preventDefault();
 



try
 { 
  

    const respon = await fetch (`http://localhost:8081/user/add-user`,{
    method:"POST",
    headers:{
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(user),
  });
  console.log(user.userName);

   if(respon.ok){
    alert("Log in Succssesfuly..!");
    setUser({
      userName:'' ,
      password: '',
      userEmail: '',
      userAddress: '',
      userNumber: '',
      role:0
    });

    const redirectPath=location.state?.form||"/";
    navigate(redirectPath);

   }}
   catch(error){
    console.error('Error:', error);
  }
 }

  return (
    <form className="form-signin w-200 m-auto  mb-10">

      <img
        className="mb-4"
        src={logo}
        alt="Logo"
        width="72"
        height="57"
      />
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