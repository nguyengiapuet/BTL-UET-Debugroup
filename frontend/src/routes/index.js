import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/user_home/Home";
import Upvoted from "../pages/user/user_project/Upvoted";
import MyProject from "../pages/user/user_project/MyProject";
import Popular from "../pages/user/user_project/Popular";
import Profile from "../pages/user/user_account/Profile";
import ChangePassword from "../pages//user/user_account/ChangePassword";
import Pen from "../pages/user/user_project/Pen";
import App from "../App";
import UserDetails from "../pages/user/user_account/UserDetails";
import ProjectDashboard from "../pages/admin/admin_project/ProjectDB";
import UserDashboard from "../pages/admin/admin_user/UserDB";
import CommentDashboard from "../pages/admin/admin_comment/CommentDB";
import StartPage from "../pages/app/StartPage";
import LoginPage from "../pages/user/user_account/LogIn";
import SignUp from "../pages/user/user_account/SignUp";
import TrashUser from "../pages/admin/admin_user/TrashUser";

const router = createBrowserRouter([
	{
		path: "/",
		element: <StartPage />,
	},
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/",
				element: <Home />,
				children: [
					{
						path: "/popular",
						element: <Popular />,
						children: [],
					},
					{
						path: "/upvoted",
						element: <Upvoted />,
						children: [],
					},
					{
						path: "/myproject",
						element: <MyProject />,
						children: [],
					},
				],
			},
			{
				path: "/admin/project-dashboard",
				element: <ProjectDashboard />,
				children: [],
			},
			{
				path: "/admin/user-dashboard",
				element: <UserDashboard />,
				children: [],
			},
			{
				path: "/admin/comment-dashboard",
				element: <CommentDashboard />,
				children: [],
			},
			{
				path: "/users/trash",
				element: <TrashUser />,
				children: [],
			},
			{
				path: "/info/:username",
				element: <UserDetails />,
				children: [],
			},
		],
	},
	{
		path: "/pen/:id",
		element: <Pen />,
		children: [],
	},
	{
		path: "/pen",
		element: <Pen />,
		children: [],
	},
]);

export default router;
