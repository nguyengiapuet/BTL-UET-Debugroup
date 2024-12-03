import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/user_home/Home";
import Upvoted from "../pages/user/user_project/Upvoted";
import MyProject from "../pages/user/user_project/MyProject";
import Popular from "../pages/user/user_project/Popular";
import Pen from "../pages/user/user_project/Pen";
import App from "../App";
import UserDetails from "../pages/user/user_account/UserDetails";
import ProjectDashboard from "../pages/admin/admin_project/ProjectDB";
import UserDashboard from "../pages/admin/admin_user/UserDB";
import CommentDashboard from "../pages/admin/admin_comment/CommentDB";
import StartPage from "../pages/app/StartPage";
import LoginPage from "../pages/user/user_account/LogIn";
import SignUp from "../pages/user/user_account/SignUp";
import ProjectDetail from "../pages/user/user_project/ProjectDetail";
import AboutUs from "../pages/app/AboutUs";
import LearnJs from "../pages/user/user_learnJs/LearnJs";
import Game1 from "../pages/user/user_learnJs/Game1";
import Contact from "../pages/user/contact-us/Contact";

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
					},
				],
			},
			{
				path: "/learn",
				element: <LearnJs />,
			},
			{
				path: "/learn/game1",
				element: <Game1 />,
			},
			{
				path: "/contact-us",
				element: <Contact />,
			},
			{
				path: "/about-us",
				element: <AboutUs />,
			},
			{
				path: "project-detail/:id",
				element: <ProjectDetail />,
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
