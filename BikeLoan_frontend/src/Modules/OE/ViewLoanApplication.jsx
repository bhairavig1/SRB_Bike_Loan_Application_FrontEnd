import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewLoanApplication() {
  const [customers, setCustomers] = useState([]);

  // Fetch customers and their document info
  useEffect(() => {
    axios
      .get('http://localhost:1003/loan/getAllCustomer/Submitted')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  // Get document URL to be used in the UI
  const getDocumentUrl = (documentId) => {
    // Assuming backend will serve files from "/loan/documents/{documentId}"
    return documentId ? `http://localhost:1003/loan/documents/${documentId}` : null;
  };
  function changeStatus(id){
    axios.get(`http://localhost:1003/loan/changestatus/${id}`)
    .then(res=>console.log(res.status))
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4">View Loan Applications</h2>
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
              <th>Address Proof</th>
              <th>PAN Card</th>
              <th>Income Tax</th>
              <th>Aadhar Card</th>
              <th>Photo</th>
              <th>Signature</th>
              <th>Bank Cheque</th>
              <th>Salary Slips</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="20" className="text-center">
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
                  <td>{customer.loanStatus}</td>

                  {/* Document links */}
                  <td>
                    {customer.documents?.addressProof ? (
                      <a
                        href={getDocumentUrl(customer.documents.addressProof)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </a>
                    ) : (
                      'No File'
                    )}
                  </td>
                  <td>
                    {customer.documents?.panCard ? (
                      <a
                        href={getDocumentUrl(customer.documents.panCard)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </a>
                    ) : (
                      'No File'
                    )}
                  </td>
                  <td>
                    {customer.documents?.incomeTax ? (
                      <a
                        href={getDocumentUrl(customer.documents.incomeTax)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </a>
                    ) : (
                      'No File'
                    )}
                  </td>
                  <td>
                    <img src={'application:image/pdf;base64, '+customer.allPersonalDocument.addharCard}/>
                    {/* {customer.documents?.aadharCard ? (
                      <a
                        href={getDocumentUrl(customer.documents.aadharCard)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </a>
                    ) : (
                      'No File'
                    )} */}
                  </td>
                  <td>
                    <img src={'data:image/jpeg;base64, '+customer.allPersonalDocument.photo} height={100}/>
                    {/* {customer.documents?.photo ? (
                      <a
                        href={getDocumentUrl(customer.documents.photo)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </a>
                    ) : (
                      'No File'
                    )} */}
                  </td>
                  <td>
                 <img src={'data:image/jpeg;base64, '+customer.allPersonalDocument.signature} height={100}/>

                    {/* {customer.documents?.signature ? (
                      <a
                        href={getDocumentUrl(customer.documents.signature)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </a>
                    ) : (
                      'No File'
                    )} */}
                  </td>
                  <td>
                    {customer.documents?.bankCheque ? (
                      <a
                        href={getDocumentUrl(customer.documents.bankCheque)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </a>
                    ) : (
                      'No File'
                    )}
                  </td>
                  <td>
                    {customer.documents?.salarySlips ? (
                      <a
                        href={getDocumentUrl(customer.documents.salarySlips)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </a>
                    ) : (
                      'No File'
                    )}
                  </td>
                  <td><button onClick={()=>changeStatus(customer.customerId)}>VERIFY</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewLoanApplication;
