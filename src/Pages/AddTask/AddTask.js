import React, { useContext } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate, useNavigation } from 'react-router-dom';
import task from '../../Assets/task.png';
import { AuthContext } from '../../Context/AuthProvider';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imageBB_key;
    const navigate = useNavigate();
    const navigation = useNavigation();

    const handleAddTasks = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const task = {
                        title: data.title,
                        time: data.time,
                        image: imgData.data.url,
                        email: data.email
                    }


                    fetch('http://localhost:5000/tasks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`Task added successfully`);
                            navigate('/myTask')
                        })
                }
            })
    }
   
    if (navigation.state === 'loading') {
        return (<div className='mx-auto my-6'>
            <Spinner animation="grow" variant="success" />
        </div>)
    }
    return (
        <div className='mt-5'>
            <h1 className='text-center text-success my-5'>Add Your Task Here</h1>
            <Container>
                <Row>
                    <Col sm>
                        <img src={task} alt="loginImg" className='img-fluid mb-3' />
                    </Col>
                    <Col sm>
                        <form onSubmit={handleSubmit(handleAddTasks)} className="bg-light p-4 rounded-3">
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
                                })} className="input w-100 mt-2" placeholder='Enter Your Task Name' />
                                {errors.title && <p className='text-red-600 py-3'>{errors.title.message}</p>}
                            </div>
                            <div className="form-control w-100 mt-4">
                                <label className="label"> <span className="label-text">Date & Time</span></label>
                                <input type="datetime-local" {...register("time", {
                                    required: "Date & Time is Required"
                                })} className="input w-100 mt-2" placeholder='Enter Your Task Name' />
                                {errors.time && <p className='text-red-600 py-3'>{errors.time.message}</p>}
                            </div>
                            <div className="form-control w-100 mt-4">
                                <label className="label"> <span className="label-text">Image</span></label>
                                <input type="file" {...register("image", {
                                    required: "Image is Required"
                                })} className="input input-border w-100 mt-2" placeholder='Enter Your Task Name' />
                                {errors.image && <p className='text-red-600 py-3'>{errors.image.message}</p>}
                            </div>
                            <input className='btn mt-4 w-100 btn-success' value="Add Task" type="submit" />
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddTask;