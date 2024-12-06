import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import SummaryApi from "../../../common";
import { Modal } from "antd";
import { FaUserCircle } from "react-icons/fa";
import LabelComment from "../../../pages/user/user_project/comment_components/LabelComment";
import ListComment from "../../../pages/user/user_project/comment_components/ListComment";
import InputComment from "../../../pages/user/user_project/comment_components/InputComment";
import { AuthContext } from "../../../context/AuthContext";

function ButtonComment({ pen }) {
	const [totalComment, setTotalComment] = useState();
	const [project, setProject] = useState("");
	const [refreshComment, setRefreshComment] = useState(false);
	const { userData } = useContext(AuthContext);

	const totalComments = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.totalCommentPen.url}/${pen.id}`
			);
			if (response.data.success) {
				setTotalComment(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		totalComments();
	}, [refreshComment]);

	// TODO: Handle modal of project preview.
	const [open, setOpen] = useState(false);
	const showModal = () => {
		setProject(pen);
		setOpen(true);
	};
	const handleCancel = () => {
		setOpen(false);
	};
	return (
		<div className="w-fit rounded-xl flex gap-1 items-center justify-center">
			<FaComment
				onClick={() => showModal()}
				className="text-[16px] cursor-pointer text-[#545454] hover:opacity-80 hover:text-blue-500"
			/>

			<p className="text-[#545454] text-[16px]">
				{totalComment ? totalComment : 0}
			</p>
			{/* This is modal of project preview to show all comments */}
			<div>
				<Modal
					open={open}
					title={<ModalTitle />}
					onCancel={handleCancel}
					width={800}
					styles={{
						content: {
							top: "50%",
							maxHeight: "80vh",
							display: "flex",
							flexDirection: "column",
						},
						body: {
							overflow: "auto",
							maxHeight: "calc(80vh - 110px)",
						},
					}}
					footer={
						<FooterModal
							project={project}
							setRefreshComment={setRefreshComment}
							userData={userData}
							refreshComment={refreshComment}
						/>
					}
				>
					<ModalContent
						project={project}
						setOpen={setOpen}
						setRefreshComment={setRefreshComment}
						userData={userData}
						refreshComment={refreshComment}
					/>
				</Modal>
			</div>
		</div>
	);
}

const ModalTitle = () => {
	return (
		<div className="text-xl font-bold text-center border-b-[1px] border-gray-300 pb-1">
			Project preview
		</div>
	);
};
const ModalContent = ({ project, setRefreshComment, refreshComment }) => {
	const [allComments, setAllComments] = useState([]);

	const getAllCommentsByProject = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.allComments.url}/${project.id}`
			);

			if (response.data.success) {
				setAllComments(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		getAllCommentsByProject();
	}, [refreshComment]);
	return (
		<div className="flex flex-col gap-2">
			<div className="p-4 flex flex-row gap-4 items-center justify-start">
				<div className="flex items-center py-2 gap-2">
					{project.avatar ? (
						<img
							src={project.avatar}
							alt=""
							className="w-10 h-10 rounded-full border border-[#666]"
						/>
					) : (
						<FaUserCircle className="text-5xl" />
					)}
					<div className="flex flex-col">
						<p className="text-md font-medium">
							{project.username}
						</p>
						<p className="text-sm text-gray-500">{project.email}</p>
					</div>
				</div>
				<div className="w-[1px] h-[30px] bg-gray-400"></div>
				<div className="text-2xl font-semibold grow text-center text-gray-800 px-4 py-2 bg-gradient-to-r from-transparent via-blue-100 to-transparent rounded-lg shadow-sm transition-shadow duration-300">
					{project.title}
				</div>
			</div>
			<div className="overflow-hidden bg-slate-300 flex items-center justify-center">
				<iframe
					className="w-full min-h-[300px]"
					srcDoc={project.output}
				/>
			</div>
			{/* Bottom content: comments */}
			<div className="flex flex-col gap-2 pb-10">
				<div className="text-[16px] font-bold text-black">Comments</div>
				<div className="w-full h-[1px] bg-gray-400"></div>
				<LabelComment pen={project} refreshComment={refreshComment} />
				<ListComment
					project={project}
					refreshComment={refreshComment}
					setRefreshComment={setRefreshComment}
				/>
			</div>
		</div>
	);
};

const FooterModal = ({ project, setRefreshComment, userData }) => {
	return (
		<div className="w-full h-12 rounded-xl flex flex-row items-center justify-between relative mt-3 border-[1px] border-gray-200 focus-within:border-[#9CA3AF]">
			<InputComment
				project={project}
				setRefreshComment={setRefreshComment}
				avatar={userData?.avatar}
			/>
		</div>
	);
};
export default ButtonComment;
