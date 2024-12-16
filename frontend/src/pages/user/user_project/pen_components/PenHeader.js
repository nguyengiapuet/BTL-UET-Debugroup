import { FaChevronDown, FaEdit, FaSave, FaShare } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillCode } from "react-icons/ai";
import {
	UserAvatar,
	UserPopupInPen,
} from "../../../../components/layout/Header";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../../../common/constants";
import { Modal, message } from "antd";
import DialogSavePen from "./DialogSavePen";
import axios from "axios";
import SummaryApi from "../../../../common";

function ProjectHeader({
	editTitle,
	handleEdit,
	handleBlur,
	handleKey,
	handleSavePens,
	handleOnchanePen,
	userData,
	inputRef,
	dataPen,
}) {
	const params = useParams();

	// Hanlde to show modal.
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isOpenSave, setIsOpenSave] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	// Handle to toggle status of project.
	const [isPublic, setIsPublic] = useState(false);
	const navigate = useNavigate();

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleOK = () => {
		setIsModalOpen(false);
	};

	// Check if not owner of project => disable set private/public.
	const checkOwnerProject = async (user_email, project_id) => {
		try {
			const response = await axios.post(SummaryApi.checkOwnerPoject.url, {
				user_email: user_email,
				project_id: project_id,
			});

			if (response.data.success) {
				console.log("Test data", response.data.data);
				setIsOwner(response.data.data);
				return response.data.data;
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const handleShareModal = async () => {
		if (!dataPen.id) {
			message.error("Save this project to share for everyone!");
			return;
		}
		console.log("Test id pen: ", dataPen.id);
		await checkOwnerProject(userData.email, dataPen.id);

		setIsModalOpen(true);
	};
	useEffect(() => {
		console.log("Test owner1", isOwner);
	}, [isOwner]);
	const handleToogleStatus = () => {
		setIsPublic(!isPublic);
	};

	// Handle to show message of copy action.
	const [messageApi, contextHolder] = message.useMessage();

	const success = () => {
		if (!isPublic) {
			messageApi.open({
				type: "error",
				content: "Project is private! Set to public to share",
			});
			return;
		}
		navigator.clipboard.writeText(window.location.href);
		messageApi.open({
			type: "success",
			content: "Copied to clipboard!",
		});
	};

	return (
		<div className="h-[60px] bg-[#15222e] flex items-center justify-between border-b border-gray-400">
			{contextHolder}
			<div className="h-[60px] flex items-center gap-3 flex-row pl-2 ">
				<AiFillCode
					onClick={() => navigate("/popular")}
					className="text-[#9C6317] cursor-pointer text-4xl"
				/>
				<div>
					<div className="flex items-center gap-3">
						<input
							style={{ width: `${dataPen.title.length}ch` }}
							ref={inputRef}
							onBlur={handleBlur}
							onKeyDown={handleKey}
							value={dataPen.title}
							name="title"
							type="text"
							className="text-white text-md font-medium bg-transparent outline-none"
							onChange={(e) =>
								handleOnchanePen(e.target.value, e.target.name)
							}
						/>
						{editTitle && (
							<FaEdit
								className="text-white text-md block cursor-pointer hover:text-green-300"
								onClick={handleEdit}
							/>
						)}
					</div>
					<h3 className="text-xs text-slate-400 font-normal">
						Anonymous
					</h3>
				</div>
			</div>

			<div className="flex gap-6 flex-row pr-2">
				<div className="flex flex-row gap-3 justify-center items-center">
					<button
						className="max-h-[30px] text-sm flex gap-1 items-center bg-[#9C6317] px-4 py-[3px] rounded text-white hover:bg-opacity-75"
						onClick={handleShareModal}
						// disabled={dataPen.id !== ""}
					>
						<FaShare className="text-sm" />
						<div>Share</div>
					</button>
					{(!params.id || dataPen.email === userData.email) && (
						<>
							<div
								onClick={() => {
									console.log(
										"Test:",
										dataPen.email === userData.email
									);
									setIsOpenSave(true);
								}}
								className="text-sm flex gap-1 items-center bg-[#9C6317] px-4 py-[3px] rounded text-white hover:bg-opacity-75"
							>
								<FaSave />
								<button>Save</button>
							</div>
							<DialogSavePen
								handleSaveProject={handleSavePens}
								isOpenSave={isOpenSave}
								setIsOpenSave={setIsOpenSave}
								dataPen={dataPen}
							/>
						</>
					)}
				</div>
				<div className="py-[3px] w-[1px] bg-white"></div>
				<UserSection />
			</div>
			{/* Modal to share project */}
			<Modal
				title={<div className="text-md font-bold">Share project</div>}
				open={isModalOpen}
				onCancel={handleCancel}
				onOk={handleOK}
			>
				<div className="flex flex-col gap-4 p-4">
					{userData.id && isOwner && (
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">
								Project Status:
							</span>
							<button
								className="relative w-24 h-8 rounded-2xl transition-all duration-300 ease-in-out flex items-center px-2 outline-none overflow-hidden"
								style={{
									backgroundColor: isPublic
										? "#22c55e"
										: "#ef4444",
								}}
								onClick={handleToogleStatus}
							>
								<span
									className="text-white text-sm font-medium select-none absolute transition-all duration-300 ease-in-out transform"
									style={{
										left: isPublic ? "8px" : "-100%",
										opacity: isPublic ? 1 : 0,
										transform: `translateX(${
											isPublic ? "0" : "20px"
										})`,
									}}
								>
									Public
								</span>

								<span
									className="text-white text-sm font-medium select-none absolute transition-all duration-300 ease-in-out transform"
									style={{
										right: !isPublic ? "8px" : "-100%",
										opacity: !isPublic ? 1 : 0,
										transform: `translateX(${
											!isPublic ? "0" : "-20px"
										})`,
									}}
								>
									Private
								</span>

								<span
									className="absolute w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
									style={{
										transform: `translateX(${
											isPublic ? "54px" : "0"
										})`,
									}}
								/>
							</button>
						</div>
					)}
					<div className="flex flex-col gap-2">
						<span className="text-sm font-medium">Share URL:</span>
						<div className="flex gap-2">
							<input
								type="text"
								value={window.location.href}
								readOnly
								className="flex-1 px-3 py-1 border rounded bg-gray-50"
							/>
							<button
								onClick={success}
								className="px-4 py-1 bg-[#9C6317] text-white rounded hover:bg-opacity-75"
							>
								Copy
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}

const UserSection = () => {
	const { userData, setUserData, setTitle } = useContext(AuthContext);
	const [openPop, setOpenPop] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isPasswordOpen, setIsPasswordOpen] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		setUserData({
			id: "",
			username: "",
			email: "",
			password: "",
			role: "",
			avatar: "",
		});
	};
	// else
	return (
		<>
			{userData?.id ? (
				<div
					className="flex flex-row gap-6 items-center justify-center"
					onClick={() => setOpenPop(!openPop)}
					onBlur={() => setOpenPop(false)}
				>
					<div className="h-full min-w-[250px] flex flex-row items-center justify-start gap-3 relative">
						<UserAvatar avatar={userData.avatar} size="size-10" />
						<div className="text-sm font-medium flex text-white flex-row justify-center items-center gap-1 cursor-pointer">
							<span className="font-medium ">Xin chào,</span>
							<span className="font-bold">
								{userData.username}
							</span>
							<FaChevronDown
								className={`ml-1 text-gray-500 transition-transform duration-300 ${
									openPop ? "rotate-180" : ""
								}`}
							/>
						</div>
						{openPop && (
							<UserPopupInPen
								userData={userData}
								setOpenPop={setOpenPop}
								setTitle={setTitle}
								setIsProfileOpen={setIsProfileOpen}
								setIsPasswordOpen={setIsPasswordOpen}
								handleLogout={handleLogout}
							/>
						)}
					</div>
				</div>
			) : (
				<div className="flex flex-row gap-3">
					<div className="flex items-center border-[1px] border-slate-500 bg-white px-4 py-[3px] text-sm rounded text-black hover:bg-opacity-75">
						<Link to="/signup">Signup</Link>
					</div>
					<div className="flex items-center border-[1px] border-[#D9D9D9] bg-slate-500 px-4 py-[3px] text-sm rounded text-white hover:bg-opacity-75">
						<Link to="/login">Login</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default ProjectHeader;
