import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewEmployee() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:1007/admin/getAll');
      setEmployees(response.data);
      console.log('Employees fetched:', response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to load employees.');
    }
  };

  const deleteEmployee = (empId) => {
    axios.delete(`http://localhost:1007/admin/${empId}`)
      .then((res) => {
        if (res.status === 200) {
          fetchEmployees();
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Employee Details</h2>
      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Age</th>
            <th>Username</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{emp.empFirstName}</td>
                <td>{emp.empMiddleName}</td>
                <td>{emp.empLastName}</td>
                <td>{emp.empEmail}</td>
                <td>{emp.empSalary}</td>
                <td>{emp.empAge}</td>
                <td>{emp.username}</td>
                <td>{emp.usertype}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => deleteEmployee(emp.empId)}
                  >
                    Delete
                  </button>
                  {' '}
                  <Link 
                    to={`/update/${emp.empId}`} 
                    className="btn btn-warning btn-sm"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmployee;
