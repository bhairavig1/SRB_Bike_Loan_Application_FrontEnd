import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ApprovedEnquiry() {
    const [enquiries, setEnquiries] = useState([]);
    const [allEnquiries, setAllEnquiries] = useState([]); // Optional, remove if unused

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:1000/customer/approved');
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

    return (
        <div>
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
                        <th>Action</th>
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
                                <td> <Link
                                    className="btn btn-success btn-sm"
                                    to={`/loanApplicationForm/${enquiry.customerId}`}
                                >
                                    Apply_Loan
                                </Link></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12" className="text-center">
                                No enquiries found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ApprovedEnquiry;
