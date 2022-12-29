import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import loginImg from '../../Assets/login.png';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setAuthToken } from '../../Api/Auth';

const Register = () => {
    const { createUser, } = useContext(AuthContext);
    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setAuthToken(user);
            })
            .catch(error => console.log(error));
    }
    return (
        <div className='my-5'>
            <Container>
            <Row>
                <Col sm>
                    <img src={loginImg} alt="loginImg" className='img-fluid me-3' />
                </Col>
                <Col sm>
                    <Form onSubmit={handleSignUp} className='border border-success border-2 rounded-3 p-3 mt-3'>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"name="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"name="password" placeholder="Password" />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Enter your name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control placeholder="Enter your Phone Number" />
                        </Form.Group>
                        <Button variant="success" type="submit"className='mx-auto'>
                            Submit
                        </Button>
                        <p className='my-2'>Already have an account? Please <Link to="/login">Login</Link></p>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default Register;