import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import '../css/app.css';

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);
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

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <Navbar expand="lg" className={`p-4 ${scrolled ? 'scrolled' : ''}`}>
            <Navbar.Brand className="mr-5 fw-large px-3" as={Link}  to="/">QuizLinkUp</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />

            <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="mr-auto">
                    <Nav.Link className="nav-link mx-5"   >Home</Nav.Link>
                    <Nav.Link className="nav-link mx-5" >Why QuizLinkUp</Nav.Link>
                    <Nav.Link className="nav-link mx-5" >About QuizLinkUp</Nav.Link>

                    <NavDropdown
                        title="Sign up"
                        id="navbarDropdownSignUp"
                        show={showSignUpDropdown}
                        onClick={toggleSignUpDropdown}
                        className='mx-5'
                    >
                        <NavDropdown.Item as={Link} to="/formateurRegister/signup">as educator</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/student/signup">as student</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                        title="Log in"
                        id="navbarDropdownLogIn"
                        show={showLogInDropdown}
                        onClick={toggleLogInDropdown}
                        className='mx-5'
                    >
                        <NavDropdown.Item as={Link} to="/formateurRegister/signin">as educator</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/student/signin">as student</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
