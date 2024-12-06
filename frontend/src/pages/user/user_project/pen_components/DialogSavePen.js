import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DialogSavePen({ handleSaveProject, isOpenSave, setIsOpenSave }) {
	const [isPublic, setIsPublic] = useState(false);
	const navigate = useNavigate();

	const handleCancel = () => {
		setIsOpenSave(false);
	};

	const handleOK = () => {
		handleSaveProject(isPublic);
		setIsOpenSave(false);
		navigate("/");
	};

	const handleToogleStatus = () => {
		setIsPublic(!isPublic);
	};

	return (
		<Modal
			title={<div className="text-lg font-bold">Save project</div>}
			open={isOpenSave}
			onCancel={handleCancel}
			onOk={handleOK}
		>
			<div className="flex flex-col gap-4 p-4">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium">Project Status:</span>
					<button
						className="relative w-24 h-8 rounded-2xl transition-all duration-300 ease-in-out flex items-center px-2 outline-none overflow-hidden"
						style={{
							backgroundColor: isPublic ? "#22c55e" : "#ef4444",
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
			</div>
		</Modal>
	);
}

export default DialogSavePen;