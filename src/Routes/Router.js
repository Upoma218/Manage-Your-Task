import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import AddTask from "../Pages/AddTask/AddTask";
import Home from "../Pages/Home/Home/Home";
import MyTask from "../Pages/MyTask/MyTask";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import UpdateTask from "../Pages/UpdateTask/UpdateTask";

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
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/updateTask/:id',
                element: <UpdateTask></UpdateTask>,
                loader: ({params}) => fetch(`https://task-management-app-server.vercel.app/tasks/${params.id}`)
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