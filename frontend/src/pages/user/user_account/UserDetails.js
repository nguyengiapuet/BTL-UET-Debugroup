import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../../../common";
import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import ButtonFollow from "../../../components/followers/ButtonFollow";
import ProjectCard from "../user_project/project_components/ProjectCard";

function UserDetails() {
	const params = useParams();
	const location = useLocation();
	const [isFollowing, setIsFollowing] = useState();
	const [activeTab, setActiveTab] = useState("about");
	const [followers, setFollowers] = useState([]);

	const [dataUser, setDataUser] = useState({
		id: null,
		username: "",
		avatar: "",
		email: "",
		bio: "",
		followers: 0,
		following: 0,
		projects: 0,
		totalProjects: 0,
	});

	const { userData } = useContext(AuthContext);
	const [projectsUser, setProjectsUser] = useState([]);

	const [follow, setFollow] = useState({
		followerCount: 0,
		followingCount: 0,
	});

	const navigate = useNavigate();

	const handleClickPens = (pen) => {
		navigate(`/pen/${pen.id}`);
	};

	const handleRemove = async (pen) => {
		try {
			const response = await axios.delete(
				`${SummaryApi.deletePens.url}/${pen.id}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchUserProjects();
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const fetchUserProjects = async () => {
		try {
			console.log("Yest", params.username);
			const response = await axios.post(
				SummaryApi.getAllPensPublicUser.url,
				{
					username: params.username,
				}
			);

			if (response.data.success) {
				setProjectsUser(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const fetchUserDetails = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.detailUserOther.url}/${params.username}`
			);

			if (response.data.success) {
				console.log(response.data.data);
				setDataUser({ ...dataUser, ...response.data.data });
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const fetchCountFollower = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.countFollower.url}/${dataUser.id}`
			);

			if (response.data.success) {
				setFollow(response.data.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const getListFollowingUser = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.getListFollowingUser.url}/${params.username}`
			);
			if (response.data.success) {
				console.log(response.data.data);
				setFollowers(response.data.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchUserDetails();
		fetchUserProjects();
		getListFollowingUser();
	}, [dataUser.id, location]);

	useEffect(() => {
		fetchCountFollower();
		getListFollowingUser();
		fetchCountFollower();
	}, [isFollowing, dataUser.id]);

	return (
		<div className="bg-white w-full h-[100vh] overflow-y-scroll pb-20 border-l-2 border-gray-300">
			<div className="flex flex-col items-center">
				{/* User detail header */}
				<div className="w-full h-40 bg-gradient-to-r from-[#9C6317]/20 to-[#9C6317]/40"></div>
				<div className="w-full bg-white">
					{dataUser?.avatar ? (
						<img
							alt=""
							className="object-cover h-20 w-20 rounded-full bottom-10 relative mx-auto ring-4 ring-transparent"
							src={dataUser?.avatar}
						/>
					) : (
						<FaUserCircle className="h-20 w-20 rounded-full bottom-10 relative mx-auto ring-4 ring-transparent" />
					)}
				</div>
				<div className="-my-7 text-lg font-bold">
					{dataUser.username}
				</div>

				{/* Followers and following with actions: follow/unfollow/edit profile */}
				<SocialOfUser
					follow={follow}
					userData={userData}
					setIsFollowing={setIsFollowing}
					isFollowing={isFollowing}
					dataUser={dataUser}
				/>

				{/* This is 2 tabs view of UserDetails: Profile and Projects */}
				<div className="w-full mt-8">
					<div className="flex justify-center border-b border-t border-gray-300 relative">
						{/* Button profile tab */}
						<button
							className={`px-5 py-4 font-medium relative ${
								activeTab === "about"
									? "text-[#9C6317]"
									: "text-gray-500 hover:text-[#9C6317]"
							}`}
							onClick={() => setActiveTab("about")}
						>
							Profile
							<div
								className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#9C6317] transition-transform duration-300 ease-in-out ${
									activeTab === "about"
										? "scale-x-100"
										: "scale-x-0"
								}`}
							></div>
						</button>
						{/* Button projects tab */}
						<button
							className={`px-5 py-4 font-medium relative ${
								activeTab === "projects"
									? "text-[#9C6317]"
									: "text-gray-500 hover:text-[#9C6317]"
							}`}
							onClick={() => setActiveTab("projects")}
						>
							Projects
							<div
								className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#9C6317] transition-transform duration-300 ease-in-out ${
									activeTab === "projects"
										? "scale-x-100"
										: "scale-x-0"
								}`}
							/>
						</button>
					</div>

					<div className="mt-8 px-4 w-full">
						{/* Profile tab */}
						{activeTab === "about" ? (
							<div
								className={`transition-opacity duration-300 ease-in-out ${
									activeTab === "about"
										? "opacity-100"
										: "opacity-0"
								}`}
							>
								<ProfileTab
									dataUser={dataUser}
									followers={followers}
								/>
							</div>
						) : (
							/* Projects tab */
							<div
								className={`flex flex-wrap w-full gap-x-[30px] gap-y-10 h-fit justify-start transition-opacity duration-300 ease-in-out ${
									activeTab === "projects"
										? "opacity-100"
										: "opacity-0"
								}`}
							>
								{projectsUser.length === 0 ? (
									<div className="text-gray-400 w-full font-medium text-center text-xl">
										No projects available
									</div>
								) : (
									projectsUser.map((pen, index) => (
										<ProjectCard key={index} pen={pen} />
									))
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

const SocialOfUser = ({
	follow,
	userData,
	setIsFollowing,
	isFollowing,
	dataUser,
}) => {
	return (
		<div className="bg-white flex flex-col gap-6 items-center justify-center mt-7 text-sm text-gray-700">
			<div className="flex flex-col justify-center items-center text-center max-w-[600px] p-4 border rounded-lg shadow-lg bg-white">
				<h2 className="text-2xl font-bold mb-2">
					Welcome to <i>{dataUser.username}</i> Profile!
				</h2>
				<p className="text-gray-600 mb-4">
					Follow for daily coding tips, memes, and freebies!
				</p>
				<p className="text-gray-800 mb-4">
					Since 2009, Dribbble has been the go-to destination for
					millions of designers worldwide to find inspiration and grow
					their portfolios.
				</p>
			</div>

			<div className="flex flex-row gap-2 items-center justify-center">
				<div className="flex flex-col items-center justify-center text-lg font-bold">
					{follow.followingCount}
					<div className="text-gray-500 text-sm font-normal">
						Followers
					</div>
				</div>
				<div className="w-[1px] h-[30px] bg-gray-400 mx-4"></div>
				<div className="flex flex-col items-center justify-center text-lg font-bold">
					{follow.followerCount}
					<div className="text-gray-500 text-sm font-normal">
						Following
					</div>
				</div>
				<div className="w-[1px] h-[30px] bg-gray-400 mx-4"></div>
				<ButtonFollow
					currentUser={userData}
					dataUser={dataUser}
					setIsFollowing={setIsFollowing}
					isFollowing={isFollowing}
				/>
			</div>
		</div>
	);
};

const ProfileTab = ({ dataUser, followers }) => {
	return (
		<div className="w-full flex flex-row justify-between items-start gap-4">
			{/* Bio of users */}
			<div className="max-w-2xl w-[60%] max-h-[400px] overflow-y-auto text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-6 shadow-sm">
				{/* {dataUser?.bio ? */}(
				<span>
					<span className="font-medium">Hi there! </span>
					I'm a passionate developer who loves creating beautiful and
					functional web applications. With expertise in frontend
					technologies like React , I enjoy bringing ideas to life
					through code.
					<br />
					<br />
					When I'm not coding, you can find me exploring new
					technologies, contributing to open source projects, or
					sharing knowledge with the developer community. When I'm not
					coding, you can find me exploring new technologies,
					contributing to open source projects, or sharing knowledge
					with the developer community. When I'm not coding, you can
					find me exploring new technologies, contributing to open
					source projects, or sharing knowledge with the developer
					community. When I'm not coding, you can find me exploring
					new technologies, contributing to open source projects, or
					sharing knowledge with the developer community.
					<br />
					<br />
					<span className="italic font-medium">
						Let's build something amazing together!
					</span>
				</span>
				)
				{/* : ( {" "}
				<div className="text-center text-xl text-gray-400 font-medium">
					// No bio available //{" "}
				</div>
				)} */}
			</div>
			<div className="max-h-[400px] overflow-y-auto grow bg-gray-50 rounded-lg shadow-sm">
				<div className="p-3 w-full gap-8 flex flex-col items-center justify-center">
					<div className="w-full text-center text-md font-bold bg-gradient-to-r from-amber-100 to-amber-200 py-2 rounded-lg">
						Followers
					</div>
					<div className="w-full flex flex-col items-center justify-center gap-3">
						{followers.map((follower, index) => (
							<Link
								key={index}
								to={`/info/${follower.username}`}
								className="w-full bg-indigo-100 hover:bg-indigo-200 rounded-lg p-2 shadow-s flex flex-row gap-3 items-center cursor-pointer"
							>
								{follower.avatar ? (
									<img
										className="rounded-full size-10 border border-gray-400"
										alt=""
										src={follower.avatar}
									/>
								) : (
									<FaUserCircle className="size-10" />
								)}
								<div className="text-sm font-bold">
									{follower.username}
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
