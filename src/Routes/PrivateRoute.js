import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return (
            <div className='mx-96'>
                <button className="btn btn-lg mx-96 my-40 w-36 h-36 loading"></button>
            </div>
        )
    }

    if(user?.email){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};


export default PrivateRoute;