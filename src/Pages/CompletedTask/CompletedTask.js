import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const CompletedTask = () => {
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
    const handleAddComment = event => {
        event.preventDefault();
        const form = event.target;
        const text = form.text.value;

        const comment = {
            text: text
        }


        fetch('http://localhost:5000/tasksComment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('flora-token')}`
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('Comment added successfully!');
                    form.reset();
                    navigate('/myTask')
                }
                console.log(data);
            })
            .catch(error => console.log(error))
    }
   
    if (navigation.state === 'loading') {
        return (<div className='mx-auto my-6'>
            <Spinner animation="grow" variant="success" />
        </div>)
    }
    return (
        <div className='container my-5'>
            <h1 className='text-center text-success my-5'>Completed Task</h1>
            <div className='row'>
                {
                    tasks?.length && tasks?.map(task => <div key={task._id} className='col-sm col-lg-4 mb-3 gap-3'>
                        <Card>
                            <Card.Img variant="top" src={task?.image} style={{ "height": "200px" }} />
                            <Card.Body className='text-center'>
                                <Card.Title className='text-center'>{task?.title}</Card.Title>
                                <Card.Text className='text-center'>
                                    <p>{task?.time}</p>
                                
                                {
                                    task?.condition === 'completed' && <Button className='btn btn-success mb-2'>Completed</Button>
                                }
                                {
                                    task?.condition !== 'completed' && <Link to="/myTask"><Button className='btn btn-warning mb-2 text-white'>Not Completed</Button></Link>
                                }
                                {
                                    task?.condition === 'completed' &&
                                    <form onSubmit={handleAddComment}>
                                        <input name="text" type="text" placeholder="Write your comment here" className="w-100 px-2" required />
                                        <input type="submit" className="btn btn-success w-100 my-4" value=" Add Comment" required />
                                    </form>
                                }
                                </Card.Text>
                                <Button variant="danger" size="sm" className='text-white mx-auto w-100' onClick={() => { handleDelete(task._id) }} >
                                    Delete Task
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>)
                }
            </div>
        </div>
    );
};

export default CompletedTask;