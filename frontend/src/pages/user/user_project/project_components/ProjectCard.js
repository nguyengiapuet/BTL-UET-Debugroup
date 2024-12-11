import { Link } from "react-router-dom";
import ButtonLike from "../../../../components/feature/likes/ButtonLike";
import ButtonComment from "../../../../components/feature/comments/ButtonComment";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "antd";
import { useState } from "react";

function ProjectCard({
	pen,
	userData,
	sortLike,
	owner = false,
	handleClickPens,
	handleRemove,
}) {
	const [open, setOpen] = useState(false);
	const showModal = () => {
		setOpen(true);
	};
	const hideModal = () => {
		setOpen(false);
	};

	return (
		<div className="flex flex-col min-w-[240px] w-[calc(33.33%-20px)] bg-slate-200 rounded-xl shadow-md">
			<div className="bg-white w-full rounded-xl h-[215px] flex flex-col items-center gap-4 shadow-md relative group">
				{/* Preview */}
				<Link className="w-full h-full rounded-xl overflow-x-hidden overflow-y-auto">
					<iframe className="w-full h-full" srcDoc={pen.output} />
				</Link>
				<div
					className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                    flex gap-4 items-center justify-center transition-all duration-300 rounded-xl"
				>
					<ActionButton
						to={`/project-detail/${pen.id}`}
						label="Project detail"
					/>
					<ActionButton
						to={`/pen/${pen.id}`}
						label="View source"
						target="blank"
					/>
				</div>
			</div>
			<CardFooter pen={pen} userData={userData} sortLike={sortLike} />
			{/* If my Project => Show edit and delete button */}
			{owner && (
				<div className="flex border-t-[1px] border-gray-400">
					<div
						className="py-2 flex flex-row gap-2 w-1/2 justify-center items-center border-r-[1px] border-gray-400 hover:bg-gray-300 hover:transition-all hover:duration-200 hover:scale-105 hover:rounded-bl-xl cursor-pointer"
						onClick={() => handleClickPens(pen)}
					>
						<FaEdit className="text-[16px] cursor-pointer text-sky-500" />
						<div className="text-[16px]">Edit</div>
					</div>
					<div
						className="py-2 flex flex-row gap-2 w-1/2 justify-center items-center hover:bg-gray-300 hover:transition-all hover:duration-200 hover:scale-105 hover:rounded-br-xl cursor-pointer"
						onClick={showModal}
					>
						<FaTrash className="text-[16px] cursor-pointer text-red-500" />
						<div className="text-[16px]">Delete</div>
					</div>
				</div>
			)}
			{/* This modal is for confirm or cancel delete project */}
			<Modal
				title={
					<div className="text-bold text-[18px]">
						Delete this project?
					</div>
				}
				open={open}
				onOk={() => {
					handleRemove(pen);
					setOpen(false);
				}}
				onCancel={hideModal}
				okText="Confirm"
				cancelText="Cancel"
				width={400}
			>
				<div className="flex flex-col gap-1 py-4 items-center">
					<div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
						<span className="text-2xl text-red-500 font-bold">
							!
						</span>
					</div>
					<div>Are you sure you want to delete this project?</div>
					<div>After deleting, just Admin can restore it.</div>
				</div>
			</Modal>
		</div>
	);
}

const ProjectStatus = ({ isPublic }) => (
	<div
		className={`bg-red-400 text-white font-medium px-3 py-1 rounded-md max-h-[30px] text-center ${
			isPublic ? "bg-sky-500" : "bg-red-400"
		}`}
	>
		{isPublic ? "Public" : "Private"}
	</div>
);

const ActionButton = ({ to, label, target }) => (
	<Link
		to={to}
		target={target}
		className="px-5 py-[6px] bg-[#9C6317] text-white font-medium rounded-lg
            transform translate-y-4 group-hover:translate-y-0 transition-all duration-300
            hover:bg-sky-500 hover:text-white text-sm"
	>
		{label}
	</Link>
);

const CardFooter = ({ pen, sortLike }) => (
	<div className="w-full py-2 px-2 flex flex-row justify-between items-center text-sm">
		<div className="flex flex-row gap-2 justify-center items-center">
			<div className="flex flex-col">
				<Link
					to={`/project-detail/${pen.id}`}
					className="font-semibold"
				>
					{pen.title}
				</Link>
				<div>
					by{" "}
					<Link
						to={`/info/${pen.username}`}
						className="hover:underline font-medium"
					>
						{pen.username}
					</Link>
				</div>
			</div>
			<ProjectStatus isPublic={pen.status === "public" ? true : false} />
		</div>
		<div className="flex flex-row gap-4">
			<ButtonLike pen={pen} sortLike={sortLike} />
			<ButtonComment pen={pen} />
		</div>
	</div>
);

export default ProjectCard;
