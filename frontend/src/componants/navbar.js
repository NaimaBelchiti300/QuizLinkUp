import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';

export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false);
    const [showSignUpDropdown, setShowSignUpDropdown] = useState(false);
    const [showLogInDropdown, setShowLogInDropdown] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleSignUpDropdown = () => {
        setShowSignUpDropdown(!showSignUpDropdown);
        setShowLogInDropdown(false); // Close login dropdown when signup dropdown is opened
    };

    const toggleLogInDropdown = () => {
        setShowLogInDropdown(!showLogInDropdown);
        setShowSignUpDropdown(false); // Close signup dropdown when login dropdown is opened
    };



    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light p-4`}>
            <div className="container">
                <Link className="navbar-brand mr-5 fw-large px-3">QuizLinkUp</Link>
                <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link mx-5" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown mx-5">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownSignUp" role="button" onClick={toggleSignUpDropdown}>
                                Sign up
                            </a>
                            <div className={`dropdown-menu ${showSignUpDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownSignUp">
                                <Link to="/signup/educator" className="dropdown-item">as educator</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/signup/student" className="dropdown-item">as student</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown mx-5">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownLogIn" role="button" onClick={toggleLogInDropdown}>
                                Log in
                            </a>
                            <div className={`dropdown-menu ${showLogInDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownLogIn">
                                <Link to="/signin/educator" className="dropdown-item">as educator</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/signin/student" className="dropdown-item">as student</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
