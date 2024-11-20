import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";

const props = {
	name: "file",
	action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
	headers: {
		authorization: "authorization-text",
	},
};
function ProfileModal({ isOpen, onClose }) {
	const { userData, setUserData } = useContext(AuthContext);
	const [data, setData] = useState({
		username: userData.username,
		avatar: userData.avatar,
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

		console.log("dataImg", dataImg);

		setData({ ...data, avatar: dataImg });
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
					<div className="flex flex-row justify-between items-center">
						<Button className="bg-red-500 text-white font-medium">
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
						<div className="h-16 w-16 rounded-full bg-gray-200 absolute top-3 left-3 border-2 border-red-500"></div>
					</div>
					<div className="flex flex-col gap-2 pt-10 px-3">
						<div className="font-bold text-xl">{data.username}</div>
						<div className="font-medium">example@gmail.com</div>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 justify-center items-center">
						<div className="min-w-[100px]">Name:</div>
						<input
							name="name"
							type="text"
							value={data.username}
							className="rounded-lg py-4 px-3 h-5 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
						/>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 justify-center items-center">
						<div className="min-w-[100px]">Email:</div>
						<input
							name="email"
							type="text"
							value="example@gmail.com"
							className="rounded-lg py-4 px-3 h-5 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
						/>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 justify-center items-center">
						<div className="min-w-[100px]">Username:</div>
						<input
							name="username"
							type="text"
							value="example"
							className="rounded-lg py-4 px-3 h-5 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
						/>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 items-center pb-5">
						<div className="w-[100px]">Avatar:</div>
						<Upload {...props}>
							<Button icon={<UploadOutlined />}>
								Click to Upload
							</Button>
						</Upload>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default ProfileModal;
