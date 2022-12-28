import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import AddTask from "../Pages/AddTask/AddTask";
import Home from "../Pages/Home/Home/Home";
import MyTask from "../Pages/MyTask/MyTask";

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
                element: <AddTask></AddTask>
            },
            {
                path: '/myTask',
                element: <MyTask></MyTask>
            },
            {
                path: '/completedTask',
                element: <CompletedTask></CompletedTask>
            },
        ]
    }

])