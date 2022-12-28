import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import MenuBar from '../Shared/MenuBar/MenuBar';

const Main = () => {
    return (
        <div>
            <MenuBar></MenuBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;