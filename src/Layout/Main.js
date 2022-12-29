import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuBar from '../Shared/MenuBar/MenuBar';

const Main = () => {
    return (
        <div>
            <MenuBar></MenuBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;