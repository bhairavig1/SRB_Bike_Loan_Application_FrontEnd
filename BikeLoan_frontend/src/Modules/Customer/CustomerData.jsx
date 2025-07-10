import axios from 'axios';
import React, { useState, useEffect } from 'react';

function CustomerData() {
  const [customers, setCustomers] = useState([]);
  const adminJson = localStorage.getItem("admin");
  const customerDetails = JSON.parse(adminJson);

  useEffect(() => {
    if (customerDetails) {
      setCustomers([customerDetails]);
    }
  }, [customerDetails]);

  function handleCustomerResponse(responseValue) {
    axios.put(`http://localhost:1003/loan/customerResponse/${customerDetails.customerId}/${responseValue}`)
      .then(res => {
        alert(`Response submitted: ${responseValue}`);
      })
      .catch(err => {
        alert('Error submitting response');
      });
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Loan Details</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
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
              <th>Tenure (years)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
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
                <td>{customer.loanStatus}</td>
                <td>{customer.sl?.loanTenureInYear || 'N/A'}</td>
                <td>
                  <button 
                    onClick={() => handleCustomerResponse("Accepted")} 
                    className="btn btn-success btn-sm me-2"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleCustomerResponse("Rejected")} 
                    className="btn btn-danger btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerData;
