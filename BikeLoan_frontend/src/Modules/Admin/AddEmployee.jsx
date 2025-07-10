import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

function AddEmployee() {
  const { register, handleSubmit ,reset} = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      const employeeData = {
        empFirstName: data.empFirstName,
        empMiddleName: data.empMiddleName,
        empLastName: data.empLastName,
        empEmail: data.empEmail,
        empSalary: parseFloat(data.empSalary),
        empAge: parseInt(data.empAge),
        username: data.username,
        password: data.password,
        usertype: data.usertype
      };

      formData.append('adminJson', JSON.stringify(employeeData));
      formData.append('empImage', data.empImage[0]);
      formData.append('empPancard', data.empPancard[0]);

      const response = await axios.post('http://localhost:1007/admin/addEmployee', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Response:', response.data);
      alert('Employee added successfully!');
      reset()

    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card bg-light shadow p-4">
        <h2 className="mb-4 text-center text-primary">Add Employee Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" {...register("empFirstName")} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Middle Name</label>
              <input type="text" className="form-control" {...register("empMiddleName")} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" {...register("empLastName")} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" {...register("empEmail")} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Salary</label>
              <input type="number" className="form-control" {...register("empSalary")} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Age</label>
              <input type="number" className="form-control" {...register("empAge")} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" {...register("username")} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" {...register("password")} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Image</label>
            <input type="file" className="form-control" {...register("empImage")} />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee PanCard</label>
            <input type="file" className="form-control" {...register("empPancard")} />
          </div>

          <div className="mb-4">
            <label className="form-label">User Type</label>
            <select className="form-select" {...register("usertype")}>
              <option value="CRM">Customer Relationship Manager</option>
              <option value="OE">Operational Executive</option>
              <option value="CM">Credit Manager</option>
              <option value="AH">Account Head</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
