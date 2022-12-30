import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import taskImg from '../../Assets/task.png';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const UpdateTask = () => {
    const previousTask = useLoaderData();
    // const [task, setTask] = useState(previousTask);
    // console.log(task)

    const handleUpdate = event => {
        event.preventDefault();
        const title = event.target.title.value;
        const time = event.target.time.value;
        const task = {
            title,
            time
        }
        console.log(task)

        fetch(`http://localhost:5000/updateTask/${previousTask._id}`,
            {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(task)
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Task Updated SuccessFully');
                    console.log(data)
                }
            })
    }
    

    return (
        <div className='mt-5'>
            <Container>
                <Row>
                    <Col sm>
                        <img src={taskImg} alt="loginImg" className='img-fluid mb-3' />
                    </Col>
                    <Col sm>
                        <form onSubmit={handleUpdate} className="bg-light p-4 rounded-3">
                            <input defaultValue={previousTask.title} type="text" name='title' placeholder='Your Task' required className='w-100 my-3 p-2'/>
                            <br />
                            <input defaultValue={previousTask.time} type="datetime-local" name='time'  required className='w-100 my-3 p-2'/>
                            <br />
                            <input type="submit" value='Update' className='btn btn-success w-100 my-3'/>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateTask;