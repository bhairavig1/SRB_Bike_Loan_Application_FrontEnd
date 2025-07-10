import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPendingData() {
  const [pendingEnquiries, setPendingEnquiries] = useState([]);

  useEffect(() => {
    fetchPendingEnquiries();
  }, []);

  const fetchPendingEnquiries = async () => {
    try {
      const response = await axios.get(`http://localhost:1000/customer/getStatus/${"pending"}`);
      setPendingEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching pending enquiries:', error);
    }
  };

  const generateCibil = async (id) => {
    try {
      await axios.get(`http://localhost:1002/oe/cibilgen/${id}`);
      alert(`CIBIL generated for Customer ID: ${id}`);
      // Optionally, refresh the list
      fetchPendingEnquiries();
    } catch (error) {
      console.error(`Error generating CIBIL for ID ${id}:`, error);
      alert(`Failed to generate CIBIL for Customer ID: ${id}`);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Pending Customer Enquiries</h2>

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
              <th>CIBIL ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingEnquiries.length > 0 ? (
              pendingEnquiries.map((enquiry) => (
                <tr key={enquiry.customerId}>
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
                      className="btn btn-primary btn-sm"
                      onClick={() => generateCibil(enquiry.customerId)}
                    >
                      Generate CIBIL
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center">
                  No pending enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewPendingData;
