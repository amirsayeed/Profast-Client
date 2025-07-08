import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import ProFastLogo from '../pages/Shared/ProFastLogo/ProFastLogo'
import { FaBoxOpen, FaHome, FaMotorcycle, FaUserClock, FaUserEdit } from 'react-icons/fa';
import { HiReceiptRefund } from "react-icons/hi";
import { BiPackage } from "react-icons/bi";
const DashboardLayout = () => {
    const location = useLocation();
    const isDashboardRoot = location.pathname === '/dashboard';

    return (
        <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
            {/* Page content here */}
            <div className="navbar bg-base-300 w-full lg:hidden">
                <div className="flex-none">
                    <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                    </label>
                </div>
                <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
            
            </div>
            {/* Page content here */}
            {/* Main content */}
            {isDashboardRoot && (
            <div className="p-4">
                <h2 className="text-2xl font-bold">Welcome to Your Dashboard</h2>
                <p className="text-gray-500 mt-2">
                Use the sidebar to manage parcels, payments, and more.
                </p>
            </div>
            )}
            <Outlet/>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-2">
            {/* Sidebar content here */}
            <ProFastLogo/>
                <li>
                    <Link to='/dashboard'><FaHome className="inline mr-2" /> Home</Link>
                </li>
                <li>
                    <Link to='/dashboard/myParcels'><FaBoxOpen className="inline mr-2" /> My Parcels</Link>
                </li>
                <li>
                    <Link to='/dashboard/paymentHistory'><HiReceiptRefund className="inline mr-2" /> Payment History</Link>
                </li>
                <li>
                    <Link to='/dashboard/track'><BiPackage className="inline mr-2" />Track a Package</Link>
                </li>
                <li>
                    <Link to='/dashboard/profile'><FaUserEdit className="inline mr-2" /> Update Profile</Link>
                </li>
                <li>
                    <Link to='/dashboard/activeRiders'>
                        <FaMotorcycle className="inline mr-2" /> Active Riders
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard/pendingRiders'>
                        <FaUserClock className="inline mr-2" /> Pending Riders
                    </Link>
                </li>
            </ul>
        </div>
        </div>
    );
};

export default DashboardLayout;