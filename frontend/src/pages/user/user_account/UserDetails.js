/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../../../common";
import { useContext, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { FaEdit, FaEye, FaTrash, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import ButtonLike from "../../../components/feature/likes/ButtonLike";
import ButtonComment from "../../../components/feature/comments/ButtonComment";

function UserDetails() {
	const params = useParams();
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

	const [isFollowing, setIsFollowing] = useState();
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

	const handleFollower = async () => {
		try {
			const response = await axios.post(SummaryApi.createFollower.url, {
				followingId: dataUser.id,
			});

			if (response.data.success) {
				toast.success(response.data.message);
				setIsFollowing(true);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleUnFollower = async () => {
		try {
			const response = await axios.delete(
				`${SummaryApi.deleteFollower.url}/${dataUser.id}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setIsFollowing(false);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const fetchUserProjects = async () => {
		try {
			const response = await axios.post(SummaryApi.getAllPens.url, {
				username: params.username,
			});

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

	const fetchGetFollowUser = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.getFollower.url}/${dataUser.id}`
			);

			if (response.data.success) {
				setIsFollowing(response.data.isFollowing);
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
				console.log("response.data.message", response.data.data);

				setFollow(response.data.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchUserDetails();
		fetchUserProjects();
		if (dataUser.id) {
			fetchGetFollowUser();
		}
	}, [dataUser.id]);

	useEffect(() => {
		fetchCountFollower();
	}, [isFollowing]);

	return (
		<div className="bg-slate-200 w-full h-[100vh] overflow-y-scroll pb-20">
			<div className="flex flex-col p-6 items-center">
				<div className="w-full">
					<img
						alt=""
						className="object-cover h-64 w-full rounded-lg"
						src="https://img.freepik.com/free-vector/copy-space-bokeh-spring-lights-background_52683-55649.jpg"
					/>
					<img
						alt=""
						className="object-cover h-32 w-32 rounded-full bottom-16 relative mx-auto ring-4 ring-white"
						src={dataUser.avatar}
					/>
				</div>

				<div className="-mt-12">
					<span className="text-3xl font-medium">
						{dataUser.username}
					</span>
				</div>

				<div className="flex gap-6 items-center mt-2">
					<span className="font-medium text-lg flex gap-1 items-center">
						{follow.followingCount}
						<span className="text-gray-500 text-lg font-normal">
							Followers
						</span>
					</span>
					<span className="font-medium text-lg flex gap-1 items-center">
						{follow.followerCount}
						<span className="text-gray-500 text-lg font-normal">
							Following
						</span>
					</span>
					{userData.id !== dataUser.id &&
						(!isFollowing ? (
							<button
								onClick={handleFollower}
								className="px-2 py-1 bg-green-500 rounded-md hover:bg-green-600 hover:text-white flex items-center gap-1"
							>
								<MdAdd />
								Follow
							</button>
						) : (
							<button
								onClick={handleUnFollower}
								className="px-2 py-1 bg-green-500 rounded-md hover:bg-green-600 hover:text-white flex items-center gap-1"
							>
								Following
							</button>
						))}
				</div>

				{/* List project */}
				<div className="flex flex-wrap justify-between gap-y-8 h-fit mt-10 w-[55vw]">
					{projectsUser.length !== 0 &&
						projectsUser.map((pen, index) => (
							<div
								key={index}
								className="bg-white w-[25vw] rounded-3xl h-[400px] flex flex-col items-center gap-4 px-4 py-2 shadow-md"
							>
								<div className="flex h-20 items-center justify-between w-full">
									{pen.avatar ? (
										<img
											className="w-[48px] h-[48px] rounded-full border border-[#c9c9c9]"
											src={pen.avatar}
											alt="avatar"
										/>
									) : (
										<FaUserCircle className="text-5xl text-[#acacac]" />
									)}
									<h1 className="text-2xl text-[#9C6317] font-semibold">
										{pen.title}
									</h1>

									<div className="flex gap-2">
										{userData.id === dataUser.id ? (
											<>
												<div
													onClick={() =>
														handleClickPens(pen)
													}
												>
													<FaEdit className="text-[32px] cursor-pointer text-[#E9B500]" />
												</div>

												<div
													onClick={() =>
														handleRemove(pen)
													}
												>
													<FaTrash className="text-[32px] cursor-pointer text-[#E9B500]" />
												</div>
											</>
										) : (
											<div
												onClick={() =>
													handleClickPens(pen)
												}
											>
												<FaEye className="text-[32px] cursor-pointer text-[#E9B500]" />
											</div>
										)}
									</div>
								</div>
								<iframe
									title={pen.title}
									className="w-full h-full rounded-2xl overflow-x-hidden overflow-y-auto"
									srcDoc={pen.output}
								/>

								<div className="w-full flex pt-4">
									<ButtonLike pen={pen} />
									<ButtonComment pen={pen} />
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default UserDetails;
