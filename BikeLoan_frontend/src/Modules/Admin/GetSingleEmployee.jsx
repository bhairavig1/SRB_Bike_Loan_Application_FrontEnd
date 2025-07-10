import React, { useState } from 'react';
import axios from 'axios';

function GetSingleEmployee() {
  const [empId, setEmpId] = useState('');
  const [employee, setEmployee] = useState(null);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:1007/admin/${empId}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
      alert('Employee not found or error occurred.');
      setEmployee(null);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 bg-light">
        <h2 className="text-center text-primary mb-4">Get Single Employee</h2>

        {/* Employee ID Input */}
        <div className="mb-3">
          <label htmlFor="empId" className="form-label">Employee ID</label>
          <input
            type="text"
            id="empId"
            className="form-control"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            placeholder="Enter Employee ID"
          />
        </div>

        {/* Fetch Button */}
        <button
          onClick={fetchEmployee}
          className="btn btn-primary w-100 mb-4"
        >
          Fetch Employee
        </button>

        {/* Employee Details */}
        {employee && (
          <div className="alert alert-success">
            <h4 className="alert-heading">Employee Details</h4>
            <p><strong>ID:</strong> {employee.empId}</p>
            <p><strong>Name:</strong> {employee.empFirstName} {employee.empMiddleName} {employee.empLastName}</p>
            <p><strong>Email:</strong> {employee.empEmail}</p>
            <p><strong>Salary:</strong> {employee.empSalary}</p>
            <p><strong>Age:</strong> {employee.empAge}</p>
            <p><strong>Username:</strong> {employee.username}</p>
            <p><strong>User Type:</strong> {employee.usertype}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetSingleEmployee;
