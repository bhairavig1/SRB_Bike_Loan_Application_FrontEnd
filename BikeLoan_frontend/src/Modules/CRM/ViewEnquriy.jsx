import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewEnquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [allEnquiries, setAllEnquiries] = useState([]);
  const [searchCustomerId, setSearchCustomerId] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:1000/customer/getAll');
      setEnquiries(response.data);
      setAllEnquiries(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await axios.delete(`http://localhost:1000/customer/deleteById/${customerId}`);
        alert('Enquiry deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting enquiry:', error);
        alert('Failed to delete enquiry.');
      }
    }
  };

  const handleSearch = () => {
    if (searchCustomerId.trim() === '') {
      setEnquiries(allEnquiries);
    } else {
      const filtered = allEnquiries.filter(
        (enquiry) => enquiry.customerId.toString() === searchCustomerId.trim()
      );
      setEnquiries(filtered);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Customer Enquiries</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Customer ID"
            value={searchCustomerId}
            onChange={(e) => setSearchCustomerId(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-secondary w-100"
            onClick={() => setEnquiries(allEnquiries)}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Customer ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>PAN Card No</th>
              <th>Address</th>
              <th>Alternate Mobile No</th>
              <th>Aadhar Card No</th>
              <th>Enquiry Status</th>
              <th>CIBIL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map((enquiry, index) => (
                <tr key={index}>
                  <td>{enquiry.customerId}</td>
                  <td>{enquiry.firstName}</td>
                  <td>{enquiry.lastName}</td>
                  <td>{enquiry.age}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.mobileno}</td>
                  <td>{enquiry.pancardno}</td>
                  <td>{enquiry.address}</td>
                  <td>{enquiry.altmobileno}</td>
                  <td>{enquiry.adharcard}</td>
                  <td>{enquiry.enquiryStatus}</td>
                  <td>{enquiry.ci ? enquiry.ci.cibilid : 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(enquiry.customerId)}
                    >
                      Delete
                    </button>
                    <Link
                      className="btn btn-success btn-sm"
                      to={`/updateEnquiry/${enquiry.customerId}`}
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center">
                  No enquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewEnquiry;
