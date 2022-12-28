import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import AddTask from "../Pages/AddTask/AddTask";
import Home from "../Pages/Home/Home/Home";
import MyTask from "../Pages/MyTask/MyTask";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addTask',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: '/myTask',
                element: <PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path: '/completedTask',
                element: <PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>
            },
        ]
    }

])