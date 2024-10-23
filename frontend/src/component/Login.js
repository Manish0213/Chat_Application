import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({setToken}) => {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({email: "", password: ""});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`,{
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    if(data.success === true){
    localStorage.setItem('token', data.authToken);
    localStorage.setItem('loggedInUser', JSON.stringify(data.user));
    setToken(data.authToken);
    navigate('/');
    }
  }

  return (
    <div className="form-container">
      <h2>Login Your Account</h2>
      <form onSubmit={handleSubmit} >
    <div className="form-group">
      <label for="exampleInputEmail1">Email address</label><br/>
      <input type="email" className="email-input" id="exampleInputEmail1" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange}/>
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1">Password</label><br/>
      <input type="password" className="password-input" id="exampleInputPassword1" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
    </div>
    <button type="submit" className="submit-btn">Submit</button>
    </form>
    </div>   
  )
}

export default Login