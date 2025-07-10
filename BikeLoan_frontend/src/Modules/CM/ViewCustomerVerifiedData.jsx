import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  // ✅ Make sure this import is here!
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function ViewCustomerVerifiedData() {
  const [customers, setCustomers] = useState([]);
  const {register,handleSubmit} = useForm();

  function generateSanction(data)
  {
    console.log(data);
  }

  useEffect(() => {
    axios
      .get('http://localhost:1003/loan/getAllCustomer/Verified')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Generate Sanction Letter</h2>
      <div className="table-responsive">

                  <form onSubmit={handleSubmit(generateSanction)}>
                    {/* Tenure : <input type='text' {...register('loanTenureInYear')} /> */}
.
                    <button type='submit'>Generate Sanction</button>
                  </form>

        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Age</th>
              <th>Email</th>
              <th>Aadhar No</th>
              <th>PAN No</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Amount Paid</th>
              <th>Loan Required</th>
              <th>Loan Status</th>
              <th>Add Tenure</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="13" className="text-center">
                  No data found
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId}</td>
                  <td>{customer.customerName}</td>
                  <td>{customer.customerMobileNumber}</td>
                  <td>{customer.customerAge}</td>
                  <td>{customer.customerEmail}</td>
                  <td>{customer.customerAdharCard}</td>
                  <td>{customer.customerPanCard}</td>
                  <td>{customer.customerDateOfBirth}</td>
                  <td>{customer.customerGender}</td>
                  <td>{customer.customerAmountPaidForBike}</td>
                  <td>{customer.customerTotalLoanRequired}</td>
                  <td>
                    <span
                      className={`badge ${
                        customer.loanStatus === 'Approved'
                          ? 'bg-success'
                          : customer.loanStatus === 'Pending'
                          ? 'bg-warning text-dark'
                          : 'bg-secondary'
                      }`}
                    >
                      {customer.loanStatus}
                    </span>
                  </td>
                
                  
                   <td>
                    <button className="btn btn-light btn-sm">
                    <Link to={`/generateSanctionLetter/${customer.customerId}`}>generateSanctionLetter</Link>
                    </button>
                  </td>  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCustomerVerifiedData;
