import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import { Button, Modal, Upload } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { UserAvatar } from "../../../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../../common/constants";

function ProfileModal({ isOpen, onClose }) {
	const { userData, setUserData } = useContext(AuthContext);
	const navigate = useNavigate();
	const [data, setData] = useState({
		username: userData?.username,
		avatar: userData?.avatar,

		// avatar: null
	});

	const handleUploadPic = async (e) => {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.readAsDataURL(file);

		const dataImg = await new Promise((resolve, reject) => {
			reader.onload = () => resolve(reader.result);

			reader.onerror = (error) => reject(error);
		});
		setData({ ...data, avatar: dataImg });
	};

	const handleDeleteUser = async () => {
		try {
			const response = await axios.post(
				`${SummaryApi.deleteUserSoft.url}/${userData.id}`
			);

			if (response.data.success) {
				localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
				setUserData({
					id: "",
					username: "",
					email: "",
					password: "",
					role: "",
					avatar: "",
				});
				navigate("/login");
				toast.success(response.data.message);
				window.location.reload();
				onClose();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleUpdateProfile = async () => {
		try {
			const response = await axios.put(
				`${SummaryApi.updateProfile.url}/${userData.id}`,
				{
					username: data.username,
					avatar: data.avatar,
					// avatar: dataImg
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setUserData({
					...userData,
					username: data.username,
					avatar: data.avatar,
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const changeProfile = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (userData) {
			setData({
				username: userData.username,
				avatar: userData.avatar,
			});
		}
	}, [userData]);

	const [loading, setLoading] = useState(false);
	const handleOk = () => {
		setLoading(true);
		handleUpdateProfile();
		setTimeout(() => {
			setLoading(false);
			onClose();
		}, 1000);
	};
	const handleCancel = () => {
		onClose();
	};
	return (
		<>
			<Modal
				open={isOpen}
				title={
					<div className="font-bold text-lg">Profile infomation</div>
				}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={
					<div className="flex flex-row justify-between items-center z-[999]">
						<Button
							onClick={handleDeleteUser}
							className="bg-red-500 text-white font-medium"
						>
							Delete
						</Button>
						<div className="flex flex-row gap-3">
							<Button key="back" onClick={handleCancel}>
								Cancel
							</Button>
							<Button
								key="submit"
								type="primary"
								loading={loading}
								onClick={handleOk}
							>
								Save changes
							</Button>
						</div>
					</div>
				}
			>
				<div className="flex flex-col">
					<div className="h-12 bg-gray-200 w-full relative rounded-t-lg">
						<div className="absolute top-4 left-4 overflow-hidden">
							<UserAvatar size="size-14" avatar={data.avatar} />
						</div>
					</div>
					<div className="flex flex-col gap-2 pt-10 px-3">
						<div className="font-bold text-xl">{data.username}</div>
						<div className="font-medium">{userData?.email}</div>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 justify-center items-center">
						<div className="min-w-[100px]">Name:</div>
						<input
							name="username"
							type="text"
							onChange={changeProfile}
							value={data.username}
							className="rounded-lg py-4 px-3 h-5 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
						/>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 justify-center items-center">
						<div className="min-w-[100px]">Email:</div>
						<input
							name="email"
							type="text"
							disabled
							placeholder={userData?.email ? userData.email : ""}
							className="rounded-lg py-4 px-3 h-5 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
						/>
					</div>

					<div className="flex flex-row gap-2 pt-10 px-3 items-center pb-5">
						<div className="w-[100px]">Avatar:</div>
						<div className="w-16 h-16 relative rounded-full bg-slate-200 overflow-hidden">
							<div>
								{data.avatar ? (
									<img src={data.avatar} alt="Login icon" />
								) : (
									<FaUserCircle className="w-full h-full text-center text-5xl text-[#6f6f6f]" />
								)}
							</div>
							<label>
								<div className=" text-center w-full text-xs pb-2 absolute bottom-0 text-slate-800 bg-slate-100 bg-opacity-60 cursor-pointer">
									Change avatar
								</div>
								<input
									type="file"
									className="hidden"
									onChange={handleUploadPic}
								/>
							</label>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default ProfileModal;
