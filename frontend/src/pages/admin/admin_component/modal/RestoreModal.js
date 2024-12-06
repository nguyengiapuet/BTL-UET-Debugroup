import { useEffect, useState } from "react";
import { Modal } from "antd";

function RestoreModal({ isOpen, title, onConfirm, fieldOfDelete, onCancel }) {
	const [open, setOpen] = useState();
	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	const handleConfirm = () => {
		onConfirm();
	};

	return (
		<Modal
			title={<div className="text-bold text-[18px]">{title}</div>}
			open={open}
			onOk={handleConfirm}
			onCancel={onCancel}
			okText="Confirm"
			cancelText="Cancel"
			width={400}
		>
			<div className="flex flex-col gap-1 py-4 items-center">
				<div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<div>
					Are you sure you want to restore this {fieldOfDelete}?
				</div>
				<div>After restore, user can access this {fieldOfDelete}.</div>
			</div>
		</Modal>
	);
}

export default RestoreModal;
