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
        <Navbar expand="lg" className={`p-4 ${scrolled ? 'scrolled' : ''}`}>
            <Navbar.Brand className="mr-5 fw-large px-3" href="#home">QuizLinkUp</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />

            <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="mr-auto">
                    <Nav.Link className="nav-link mx-5" href="#home">Home</Nav.Link>
                    <Nav.Link className="nav-link mx-5" href="#why">Why QuizLinkUp</Nav.Link>
                    <Nav.Link className="nav-link mx-5" href="#about">About QuizLinkUp</Nav.Link>

                    <NavDropdown
                        title="Sign up"
                        id="navbarDropdownSignUp"
                        show={showSignUpDropdown}
                        onClick={toggleSignUpDropdown}
                        className='mx-5'
                    >
                        <NavDropdown.Item as={Link} to="/signup/educator">as educator</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/signup/student">as student</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                        title="Log in"
                        id="navbarDropdownLogIn"
                        show={showLogInDropdown}
                        onClick={toggleLogInDropdown}
                        className='mx-5'
                    >
                        <NavDropdown.Item as={Link} to="/signin/educator">as educator</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/signin/student">as student</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
