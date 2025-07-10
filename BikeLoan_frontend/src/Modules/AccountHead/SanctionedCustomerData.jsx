import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function SanctionedCustomerData() {
  const [customers, setCustomers] = useState([]);
  const [amounts, setAmounts] = useState({});
  const navigate=useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:1003/loan/getAllCustomer/Sanctioned`)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  function loanDisburse(customerId, amount) {
    const payload = { amount: Number(amount) }; // you can adjust the payload as per backend
    axios
      .put(`http://localhost:1006/accountHead/loanDisburse/${customerId}/${amount}`)
      .then((res) =>{ alert('Loan Disbursed Successfully!')
        navigate("/dashboard");

      })
      .catch((error) => alert(error.message));
  }

  const handleInputChange = (e, customerId) => {
    setAmounts({
      ...amounts,
      [customerId]: e.target.value,
    });
  };

  const handleSubmitForm = (e, customerId) => {
    e.preventDefault();
    const amount = amounts[customerId];
    if (!amount) {
      alert('Please enter an amount.');
      return;
    }
    loanDisburse(customerId, amount);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Generate Sanction Letter</h2>
      <div className="table-responsive">
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
                        customer.loanStatus === 'Sanctioned'
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
                    <form onSubmit={(e) => handleSubmitForm(e, customer.customerId)}>
                      Enter Amount Transfer:
                      <input
                        type="number"
                        value={amounts[customer.customerId] || ''}
                        onChange={(e) => handleInputChange(e, customer.customerId)}
                      />
                      <button className="btn btn-light btn-sm" type="submit">
                        LoanDisburse
                      </button>
                    </form>
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

export default SanctionedCustomerData;
