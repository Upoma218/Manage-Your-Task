import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import "../../custom.scss";


const MenuBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><Link to="/"><img src={logo} alt="logo" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to="/"className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>Home</Link>
                        <Link to="/addTask"className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>Add Task</Link>
                        <Link to="/myTask"className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>My Task</Link>
                        <Link to="/completedTask"className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>Completed Task</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MenuBar;