import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function onLogin(data) {
    alert("Logging in...");
    console.log(data);


    axios.get(`http://localhost:1007/admin/adminLogin/${data.username}/${data.password}`)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("admin", JSON.stringify(res.data));
        navigate("/dashboard");
        
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white text-center">
            <h3>Admin Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onLogin)}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  {...register("username")}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  {...register("password")}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
          <div className="card-footer text-center">
            <small className="text-muted">
              Forgot your password? <a href="#" className="text-primary">Reset here</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
