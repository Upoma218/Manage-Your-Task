import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthProvider';
import taskImg from '../../Assets/task.png';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const UpdateTask = () => {
    const previousTask = useLoaderData();
    const { user } = useContext(AuthContext);
    const { register, formState: { errors } } = useForm();
    const [task, setTask] = useState(previousTask);
    
     const handleInputChange = event => {
        const task = {
            title: event.title,
            email: event.email,
            time: event.time,
        }
        const newTask = {...task};
        setTask(newTask);
    }

    const handleUpdate = () => {
        fetch(`https://task-management-app-server.vercel.app/updateTask/${previousTask._id}`, 
        {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data)
                    toast.success('Task Updated SuccessFully');
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
                        <form onClick={() => handleUpdate(task._id)} className="bg-light p-4 rounded-3">
                            <div className="form-control w-100">
                                <label className="label"> <span className="label-text">Email</span></label>
                                <input type="text"{...register('email', {
                                    required: "Email is required"
                                })} className="input w-100 mt-2" value={user?.email} readOnly />
                                {errors.email && <p className='text-red-600 py-3'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control w-100 mt-4">
                                <label className="label"> <span className="label-text">Task Name</span></label>
                                <input type="text" {...register("title", {
                                    required: "Task Name is Required"
                                })} className="input w-100 mt-2"value={task?.title} placeholder='Enter Your Task Name'onChange={handleInputChange} />
                                {errors.title && <p className='text-red-600 py-3'>{errors.title.message}</p>}
                            </div>
                            <div className="form-control w-100 mt-4">
                                <label className="label"> <span className="label-text">Date & Time</span></label>
                                <input type="datetime-local" {...register("time", {
                                    required: "Date & Time is Required"
                                })} className="input w-100 mt-2"value={task?.time} placeholder='Enter Your Task Name' />
                                {errors.time && <p className='text-red-600 py-3'>{errors.time.message}</p>}
                            </div>
                            <input className='btn mt-4 w-100 btn-success' value="Update Task" type="submit" />
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UpdateTask;