import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import '../App.css';

export default function NavBar() {
    const [showSignUpDropdown, setShowSignUpDropdown] = useState(false);
    const [showLogInDropdown, setShowLogInDropdown] = useState(false);

    const toggleSignUpDropdown = () => {
        setShowSignUpDropdown(!showSignUpDropdown);
        setShowLogInDropdown(false); // Close login dropdown when signup dropdown is opened
    };

    const toggleLogInDropdown = () => {
        setShowLogInDropdown(!showLogInDropdown);
        setShowSignUpDropdown(false); // Close signup dropdown when login dropdown is opened
    };

    return (
        <nav className="navbar navbar-expand-lg  px-3 py-3">
            <a className="navbar-brand mr-5 fw-large px-3"  href="/">QuizLinkUp</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                     <li className="nav-item marginleft">
                        <Link className="nav-link active" to='/home'>Home</Link>
                    </li>
                    <li className="nav-item marginleft">
                        <Link className="nav-link" to='/why'>Why us</Link>
                    </li>
                    <li className="nav-item marginleft">
                        <Link className="nav-link" to='/about'>About us</Link>
                    </li>
                    <li className="nav-item marginleft dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" onClick={toggleSignUpDropdown} id="navbarDropdownSignUp" role="button" aria-haspopup="true" aria-expanded={showSignUpDropdown ? 'true' : 'false'}>
                            Sign up
                        </Link>
                        <ul className={`dropdown-menu dropdown-menu-end shadow-lg col-3 mt-0 ${showSignUpDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownSignUp">
                            <li><Link to='/signup/educator' className="dropdown-item">as educator</Link></li>
                            <hr className="dropdown-divider col-10 mx-auto" />
                            <li><Link to='/signup/student' className="dropdown-item">as student</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item marginleft dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" onClick={toggleLogInDropdown} id="navbarDropdownLogIn" role="button" aria-haspopup="true" aria-expanded={showLogInDropdown ? 'true' : 'false'}>
                            Log in
                        </Link>
                        <ul className={`dropdown-menu dropdown-menu-end shadow-lg col-3 mt-0 ${showLogInDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownLogIn">
                            <li><Link to='/signin/educator' className="dropdown-item">as educator</Link></li>
                            <hr className="dropdown-divider col-10 mx-auto" />
                            <li><Link to='/signin/student' className="dropdown-item">as student</Link></li>
                        </ul>
                        <div className="dropdown-divider"></div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
