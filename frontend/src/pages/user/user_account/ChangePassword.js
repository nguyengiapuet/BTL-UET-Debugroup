import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Button, Modal } from "antd";

function ChangePasswordModal({ isOpen, onClose }) {
	const { userData, setUserData } = useContext(AuthContext);
	const [data, setData] = useState({
		email: userData.email,
		// avatar: null
	});
	const [loading, setLoading] = useState(false);
	const handleOk = () => {
		setLoading(true);
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
						<div className="h-16 w-16 rounded-full bg-gray-200 absolute top-3 left-3 border-2 border-red-500"></div>
					</div>
					<div className="flex flex-col gap-2 pt-10 px-3">
						<div className="font-bold text-xl">
							{userData.username}
						</div>
						<div className="font-medium">example@gmail.com</div>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 justify-center items-center">
						<div className="min-w-[100px]">Password:</div>
						<input
							name="password"
							type="password"
							className="rounded-lg py-4 px-3 h-5 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
						/>
					</div>
					<div className="flex flex-row gap-2 pt-10 px-3 justify-center items-center">
						<div className="min-w-[100px]">New password:</div>
						<input
							name="newPassword"
							type="password"
							className="rounded-lg py-4 px-3 h-5 w-full bg-white drop-shadow-sm border border-gray-300 focus:border-[#2070ff] focus:outline-none focus:ring-0"
						/>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default ChangePasswordModal;
