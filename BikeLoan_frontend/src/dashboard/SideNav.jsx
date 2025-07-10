import React from 'react';
import { Link } from 'react-router-dom';

function SideNav() {
    const adminJson = localStorage.getItem("admin");
    const { usertype } = JSON.parse(adminJson);

    const option = {
        ADMIN: [
            { label: "Add Employee", to: "/dashboard/addEmployee" },
            { label: "View Employee", to: "/dashboard/viewEmployee" },
            { label: "Get Single Employee", to: "/dashboard/getSingleEmployee" }

        ],
        CRM: [
            { label: "Add Enquiry", to: "/dashboard/addEnquiry" },
            { label: "View Enquiry", to: "/dashboard/viewEnquiry" },
            { label: "Approved Enquiry", to: "/dashboard/approvedEnquiry" }
        ],
        OE: [
            { label: "View Pending Data", to: "/dashboard/viewPendingData" },
            { label: "View loan Application", to: "/dashboard/viewLoanApplication" }

        ],
        CM: [
            { label: "View Customer Verified Data", to: "/dashboard/viewCustomerVerifiedData" }

        ],
        Customer: [
            { label: "Customer Info", to: "/dashboard/viewCustomer" }

        ],
        AH: [
            { label: "View Customer Sanctioned", to: "/dashboard/sanctionedCustomer" },
            { label: "Generate Ledger", to: "/dashboard/generateLedger" }


        ]
    };

    return (
        <div className="container mt-4">
            <div className="card shadow rounded border-0" style={{ backgroundColor: '#f0f8ff' }}>
                <div className="card-header bg-primary text-white text-center rounded-top">

                </div>
                <div className="card-body">
                    <div className="list-group">
                        {option[usertype].map((btn, index) => (
                            <Link
                                key={index}
                                to={btn.to}
                                className="list-group-item list-group-item-action list-group-item-light fw-semibold"
                                style={{ borderRadius: '0.375rem' }}
                            >
                                {btn.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNav;
