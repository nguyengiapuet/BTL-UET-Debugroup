import { Modal } from "antd";

function DeleteModal({
	isOpen,
	title,
	handleDelete,
	fieldOfDelete,
	onCancel,
	idProject,
	setIsOpen,
}) {
	const handleConfirm = () => {
		handleDelete(idProject);
		setIsOpen(false);
	};
	return (
		<Modal
			title={<div className="text-bold text-[18px]">{title}</div>}
			open={isOpen}
			onOk={handleConfirm}
			onCancel={onCancel}
			okText="Confirm"
			cancelText="Cancel"
			width={400}
		>
			<div className="flex flex-col gap-1 py-4 items-center">
				<div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
					<span className="text-2xl text-red-500 font-bold">!</span>
				</div>
				<div>Are you sure you want to delete this {fieldOfDelete}?</div>
				<div>After deleting, this data cannot be restored.</div>
			</div>
		</Modal>
	);
}

export default DeleteModal;
