import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Button, Modal } from "antd";
import { UserAvatar } from "../../../components/layout/Header";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";

function ChangePasswordModal({ isOpen, onClose }) {
	const { userData } = useContext(AuthContext);

	const [dataPassword, setDataPassword] = useState({
		passwordCurrent: "",
		passwordNew: "",
	});

	const onChangePassword = (e) => {
		setDataPassword({ ...dataPassword, [e.target.name]: e.target.value });
	};
	const [loading, setLoading] = useState(false);

	const checkPassword = async () => {
		try {
			const response = await axios.post(
				SummaryApi.checkPasswordUser.url,
				{
					password: dataPassword.passwordCurrent,
				}
			);

			if (response.data.success) {
				handleChangePassword();
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleChangePassword = async () => {
		try {
			const response = await axios.put(SummaryApi.changePassword.url, {
				password: dataPassword.passwordNew,
			});

			console.log("response.data.message>>>", response.data.message);

			if (response.data.success) {
				toast.success(response.data.message);
				setDataPassword({ passwordCurrent: "", passwordNew: "" });
				onClose();
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleOk = () => {
		setLoading(true);
		checkPassword();
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};
	const handleCancel = () => {
		onClose();
	};
	return (
		<>
			<Modal
				open={isOpen}
				title={<div className="font-bold text-lg">Change password</div>}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button
						key="submit"
						type="primary"
						loading={loading}
						onClick={handleOk}
					>
						Save changes
					</Button>,
				]}
			>
				<div className="flex flex-col pb-5">
					<div className="h-12 bg-gray-200 w-full relative rounded-t-lg">
						<div className="absolute top-4 left-4 overflow-hidden">
							<UserAvatar
								size="size-14"
								avatar={userData?.avatar}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2 pt-10 px-3">
						<div className="font-bold text-xl">
							{userData?.username}
						</div>
						<div className="font-medium">{userData?.email}</div>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 justify-center items-center">
						<div className="min-w-[100px]">Password:</div>
						<input
							name="passwordCurrent"
							type="password"
							value={dataPassword.passwordCurrent}
							onChange={onChangePassword}
							className="rounded-lg py-4 px-3 h-5 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
						/>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 justify-center items-center">
						<div className="min-w-[100px]">New password:</div>
						<input
							name="passwordNew"
							type="password"
							value={dataPassword.passwordNew}
							onChange={onChangePassword}
							className="rounded-lg py-4 px-3 h-5 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
						/>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default ChangePasswordModal;
