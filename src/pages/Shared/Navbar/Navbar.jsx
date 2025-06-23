import React from 'react';
import { Link, NavLink } from 'react-router';
import ProFastLogo from '../ProFastLogo/ProFastLogo';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const Navbar = () => {
    const {user,logOut} = useAuth();

    const handleSignOut = () =>{
       logOut().then(()=>{
            toast.success('Successfully logged out');
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    const navlinks = <>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About Us</NavLink></li>
                        <li><NavLink to='/coverage'>Coverage</NavLink></li>
                     </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                {navlinks}
            </ul>
            </div>
            <a className="btn btn-ghost"><ProFastLogo/></a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                {navlinks}  
            </ul>
        </div>
        <div className="navbar-end gap-3">
            {
            user ? 
            <button onClick={handleSignOut} className="btn btn-outline">Sign Out</button> :
            <Link to='/login' className="btn btn-outline">Sign In</Link> 
            }
            <button className="btn btn-primary text-black">Be a Rider</button>
        </div>
        </div>
    );
};

export default Navbar;