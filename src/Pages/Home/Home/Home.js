import React from 'react';
import hero from '../../../Assets/hero.png';
import Typewriter from 'typewriter-effect';
import { Button } from 'react-bootstrap';

const Home = () => {
    return (
        <div className='py-5'>
            <h1 className='fw-3 fw-bold text-success text-center'>Welcome to</h1>
            <h1 className="fw-1 fw-bold text-success text-center'">
                {/* A {' '} */}
                <span className='text-success text-center'>
                    <Typewriter
                        options={{
                            strings: ['TASK MANAGEMENT APP', 'TO START YOUR ACTIVITIES', 'PLEASE LOGIN FIRST'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </span>
            </h1>
            <div  className='d-flex justify-content-center align-items-center my-4'>
                <Button variant="success"size="sm">VIEW DETAILS</Button>
            </div>
            <div>
                <img src={hero} alt="" className='img-fluid mx-auto d-block' />
            </div>
        </div>
    );
};

export default Home;