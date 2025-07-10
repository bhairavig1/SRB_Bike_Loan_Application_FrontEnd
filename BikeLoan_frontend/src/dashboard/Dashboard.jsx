import React from 'react';
import Profile from './Profile';
import SideNav from './SideNav';
import { Route, Routes } from 'react-router-dom';
import '../dashboard/Dashboard.css';

import AddEmployee from '../Modules/Admin/AddEmployee';
import ViewEmpolyee from '../Modules/Admin/ViewEmpolyee';
import GetSingleEmployee from '../Modules/Admin/GetSingleEmployee';

import AddEnquiry from "../Modules/CRM/AddEnquiry";
import ViewEnquiry from "../Modules/CRM/ViewEnquriy";
import ViewPendingData from '../Modules/OE/ViewPendingData';
import ApprovedEnquiry from '../Modules/CRM/ApprovedEnquiry';
import ViewLoanApplication from '../Modules/OE/ViewLoanApplication';
import GenerateSanctionLetter from '../Modules/CM/ViewCustomerVerifiedData';
import ViewCustomerVerifiedData from '../Modules/CM/ViewCustomerVerifiedData';
import CustomerLogin from '../Modules/Customer/CustomerData';
import CustomerData from '../Modules/Customer/CustomerData';
import SanctionedCustomerData from '../Modules/AccountHead/SanctionedCustomerData';
import GenerateLedger from '../Modules/AccountHead/GenerateLedger';




function Dashboard() {
    const adminJson = localStorage.getItem("admin");
    const { usertype } = JSON.parse(adminJson);

    const appRoute = {
        ADMIN: [
            { path: "addEmployee", component: <AddEmployee /> },
            { path: "viewEmployee", component: <ViewEmpolyee /> },
            { path: "getSingleEmployee", component: <GetSingleEmployee /> }


        ],
        CRM: [
            { path: "addEnquiry", component: <AddEnquiry /> },
            { path: "viewEnquiry", component: <ViewEnquiry /> },
            { path: "approvedEnquiry", component: <ApprovedEnquiry /> }

        ],
        OE: [
            { path: "viewPendingData", component: <ViewPendingData /> },
            { path: "viewLoanApplication", component: <ViewLoanApplication /> }

        ],
        CM: [
            { path: "viewCustomerVerifiedData", component: <ViewCustomerVerifiedData /> }


        ],
        Customer: [
            { path: "viewCustomer", component: <CustomerData /> }


        ],
        AH: [
            { path: "sanctionedCustomer", component: <SanctionedCustomerData /> },
            { path: "generateLedger", component: <GenerateLedger /> }



        ]
    };

    return (
        <div className="container-fluid dashboard-background min-vh-100">
            {/* Header */}
            <div className="p-3 mb-2 bg-secondary text-white">
                <div className="col">
                    <Profile />
                </div>
            </div>

            {/* Body: Sidebar + Main */}
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2 bg-light border-end min-vh-100 p-0">
                    <SideNav />
                </div>

                {/* Main Content */}
                <div className="col-md-10 p-4">
                    <div className="bg-white bg-opacity-75 p-4 rounded shadow">
                        <Routes>
                            {appRoute[usertype].map((mapping, index) => (
                                <Route key={index} path={mapping.path} element={mapping.component} />
                            ))}
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
