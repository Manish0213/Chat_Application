import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({setToken}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      localStorage.setItem("token", data.authToken);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      setToken(data.authToken);
      navigate("/");
    }
  };

  return (
    <div className="container my-2">
        <h2>Create Your Account</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <label for="exampleInputPassword2">Name</label><br/>
          <input
            type="text"
            className="email-input"
            // id="exampleInputPassword2"
            placeholder="Enter Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail2">Email address</label><br/>
          <input
            type="email"
            className="email-input"
            // id="exampleInputEmail2"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword2">Password</label><br/>
          <input
            type="password"
            className="email-input"
            // id="exampleInputPassword2"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword2">Confirm Password</label><br/>
          <input
            type="password"
            className="email-input"
            // id="exampleInputPassword2"
            placeholder="Password"
            name="cPassword"
            value={formData.cPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
