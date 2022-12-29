import React, { useContext } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../Assets/login.png';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
    const { login } = useContext(AuthContext);
    const location = useLocation();
    console.log(location)
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;
                const currentUser = {
                    email: user.email
                }

                console.log(currentUser);

                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('task-management token', data.token);
                        alert('Successfully logged in!')
                        navigate(from, { replace: true });
                    });

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
                        <Form onSubmit={handleLogin} className='border border-success border-2 rounded-3 p-3 mt-3'>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="success" type="submit" className='mx-auto mt-4'>
                                Submit
                            </Button>
                            <p className='my-2'>Don't have an account? Please <Link to="/register">Register</Link></p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;