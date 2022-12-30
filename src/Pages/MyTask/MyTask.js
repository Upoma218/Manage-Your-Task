import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const navigation = useNavigation();

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/myTasks?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('task-management token')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        // return logout()
                    }
                    return res.json()
                })

                .then(data => {

                    setTasks(data)
                })
        }

    }, [user?.email])
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure to delete this task?');
        if (proceed) {
            fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('task-management token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('Deleted successfully');
                        const remaining = tasks.filter(task => task._id !== id);
                        setTasks(remaining);
                    }
                })
        }
    }
    const handleComplete = id => {
        fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data)
                    toast.success(' Task Completed SuccessFully Successfully');
                    navigate('/completedTask')
                }
            })
    }

    if (navigation.state === 'loading') {
        return (<div className='mx-auto my-6'>
            <Spinner animation="grow" variant="success" />
        </div>)
    }
    return (
        <div className='container my-5'>
            <h1 className='text-center text-success my-5'>My Task</h1>
            <div className='row'>
                {
                    tasks?.length && tasks?.map(task => <div key={task._id} className='col-sm col-lg-4 mb-3 gap-3'>
                        <Card>
                            <Card.Img variant="top" src={task.image} style={{ "height": "200px" }} />
                            <Card.Body className='text-center'>
                                <Card.Title className='text-center'>{task.title}</Card.Title>
                                <Card.Text className='text-center'>
                                    {task.time}
                                    <p>Comments: text</p>
                                </Card.Text>
                                <div className='d-flex justify-content-evenly'>
                                {
                                    task?.condition === 'completed' && <Button variant="success" size="sm" className='text-white'>Completed</Button>
                                }
                                {
                                    task?.condition !== 'completed' && <Button onClick={() => handleComplete(task._id)} variant="info" size="sm" className='text-white'>Complete</Button>
                                }
                                <Link to={`/updateTask/${task._id}`}><Button variant="warning" size="sm" className='text-white'>
                                    Update
                                </Button></Link>
                                <Button variant="danger" size="sm" className='text-white' onClick={() => { handleDelete(task._id) }}>
                                    Delete
                                </Button>
                            </div>
                            </Card.Body>
                            
                        </Card>

                    </div>)
                }
            </div>
        </div>
    );
};

export default MyTask;
