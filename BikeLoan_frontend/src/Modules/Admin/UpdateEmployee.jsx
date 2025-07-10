import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateEmployee() {
  const { register, setValue, handleSubmit } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:1007/admin/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          for (let prop in data) {
            setValue(prop, data[prop]);
          }
        }
      })
      .catch((error) => console.log(error.message));
  }, [id, setValue]);

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

      if (data.empImage && data.empImage.length > 0) {
        formData.append('empImage', data.empImage[0]);
      }
      if (data.empPancard && data.empPancard.length > 0) {
        formData.append('empPancard', data.empPancard[0]);
      }

      const response = await axios.put(`http://localhost:1007/admin/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
      alert('Employee updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 bg-light">
        <h2 className="text-center text-primary mb-4">Update Employee</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Employee First Name</label>
            <input type="text" className="form-control" {...register("empFirstName")} />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Middle Name</label>
            <input type="text" className="form-control" {...register("empMiddleName")} />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Last Name</label>
            <input type="text" className="form-control" {...register("empLastName")} />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Email</label>
            <input type="email" className="form-control" {...register("empEmail")} />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Salary</label>
            <input type="number" className="form-control" {...register("empSalary")} />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Age</label>
            <input type="number" className="form-control" {...register("empAge")} />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Username</label>
            <input type="text" className="form-control" {...register("username")} />
          </div>

          <div className="mb-3">
            <label className="form-label">Employee Password</label>
            <input type="password" className="form-control" {...register("password")} />
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

          <button type="submit" className="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
