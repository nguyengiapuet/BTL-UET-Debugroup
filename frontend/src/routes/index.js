import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Pen from "../pages/Pen"
import Home from "../pages/Home"
import LogIn from "../pages/LogIn"
import SignUp from "../pages/SignUp"
import Dashboard from "../pages/Dashboard"
import Popular from "../pages/Popular"
import Upvoted from "../pages/Upvoted"
import MyProject from "../pages/MyProject"
import Profile from "../pages/Profile"
import ChangePassword from "../pages/ChangePassword"
import UserDetails from "../pages/UserDetails"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            
            {
                path: '/',
                element: <Home />,
                children:[
                    {
                        path: '/popular',
                        element: <Popular />,
                        children:[]
                    },
                    {
                        path: '/upvoted',
                        element: <Upvoted />,
                        children:[]
                    },
                    {
                        path: '/myproject',
                        element: <MyProject />,
                        children:[]
                    },
                ]
            },
            {
                path: '/login',
                element: <LogIn />,
                children:[]
            },
            {
                path: '/signup',
                element: <SignUp />,
                children:[]
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
                children:[]
            },
            {
                path: '/profile',
                element: <Profile />,
                children:[]
            },
            {
                path: '/privacy',
                element: <ChangePassword />,
                children:[]
            }
            ,
            {
                path: '/info/:username',
                element: <UserDetails />,
                children:[]
            }
        ]
    },
    {
        path: '/pen/:id',
        element: <Pen />,
        children:[]
    },
    {
        path: '/pen',
        element: <Pen />,
        children:[]
    },
])

export default router