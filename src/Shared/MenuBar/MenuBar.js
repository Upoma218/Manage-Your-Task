import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import { AuthContext } from '../../Context/AuthProvider';
import "../../custom.scss";


const MenuBar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                alert('If you want to see details, please login !')
            })
            .catch(error => console.log(error))
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><Link to="/"><img src={logo} alt="logo" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to="/" className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>Home</Link>

                        {
                            user?.email ?
                                <>
                                    <Link to="/addTask" className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>Add Task</Link>
                                    <Link to="/myTask" className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>My Task</Link>
                                    <Link to="/completedTask" className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>Completed Task</Link>
                                    <Link to="/"onClick={handleLogout} className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>Logout</Link>
                                </>
                                :
                                <>
                                    <Link to="/login" className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>Login</Link>
                                    <Link to="/register" className='btn btn-outline fw-bold text-success me-2 text-decoration-none'>Register</Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MenuBar;