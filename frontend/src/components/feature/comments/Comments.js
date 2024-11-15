/* eslint-disable jsx-a11y/iframe-has-title */
import axios from "axios";
import { FaComment, FaPaperPlane, FaShare, FaUserCircle } from "react-icons/fa";
import SummaryApi from "../../../common";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

function Comments({ project, setOpen, refresh }) {
	const [comment, setComment] = useState("");
	const [allComments, setAllComments] = useState([]);
	const handleSendComments = async () => {
		try {
			const response = await axios.post(SummaryApi.sendComments.url, {
				idProject: project.id,
				content: comment,
			});

			if (response.data.success) {
				toast.success(response.data.message);
				getAllCommentsByProject();
				setComment("");
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getAllCommentsByProject = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.allComments.url}/${project.id}`
			);

			if (response.data.success) {
				console.log("response.data.data>>>>", response.data.data);
				setAllComments(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleEnter = async (e) => {
		if (e.key === "Enter") {
			await handleSendComments();
			refresh((prev) => !prev);
		}
	};

	useEffect(() => {
		getAllCommentsByProject();
	}, []);

	return (
		<div className=" bg-[#9797977a] fixed top-0 left-0 right-0 bottom-0 z-10">
			<div className="fixed bg-[#e0f5f7] w-[50%] h-[90%] top-[5%] rounded-xl right-[25%] shadow-lg scroll-none overflow-y-auto">
				<div className="bg-[#c9eefc] fixed top-[calc(5%-1px)] right-[25%] w-[50%] rounded-tl-xl rounded-tr-xl h-14 flex justify-between items-center p-4">
					<div className="text-2xl"></div>
					<MdClose
						onClick={() => setOpen(false)}
						className="text-3xl cursor-pointer hover:fill-gray-700 fill-gray-600"
					/>
				</div>
				<div className="p-4 mt-10">
					<div className="flex items-center py-2 gap-2">
						{project.avatar ? (
							<img
								src={project.avatar}
								alt=""
								className="w-12 h-12 rounded-full border border-[#666]"
							/>
						) : (
							<FaUserCircle className="text-5xl" />
						)}
						<p className="text-xl font-medium">
							{project.username}
						</p>
					</div>
					<div className=" text-xl  font-medium">{project.title}</div>
				</div>
				<div className="overflow-hidden bg-slate-300 h-[60%] flex items-center justify-center">
					<iframe
						scrolling="no"
						className="w-full h-full"
						srcDoc={project.output}
					/>
				</div>
				<div className="flex border-b-2 border-[#969696] mx-4 justify-between">
					<div className="flex m-4 gap-2 items-center ">
						<FaComment className="text-2xl fill-[#565555]" />
						<p className="text-lg text-[#424242]">
							{allComments.length} comments
						</p>
					</div>

					<div className="border border-[#989898] flex font-normal text-[#565555] gap-2 items-center px-4 my-1 transition-all rounded-md ">
						<FaShare className="text-2xl " />
						<p className="text-base ">SHARE</p>
						<div className="bg-[#666] rounded-sm py-1 px-2 hover:bg-[#808080] text-white cursor-pointer">
							Copy Link
						</div>
					</div>
				</div>

				<div className="w-full flex flex-col mb-16 gap-2 pb-2">
					{allComments.map((comment, index) => (
						<div className="px-4 w-full text-lg py-2 flex  gap-2">
							{comment.avatar ? (
								<img
									src={comment.avatar}
									alt="avt"
									className="h-[48px] w-[48px] rounded-full border border-[#4f4f4f]"
								/>
							) : (
								<FaUserCircle className="text-5xl" />
							)}
							<div className="bg-[#cad4d5] px-2 py-1 w-full rounded-md">
								<p className="text-lg font-medium">
									{comment.username}
								</p>
								<p>{comment.content}</p>
							</div>
						</div>
					))}
				</div>

				<div className=" w-[50%] h-16 fixed bottom-[calc(5%-1px)] rounded-xl">
					<input
						onKeyDown={handleEnter}
						onChange={(e) => setComment(e.target.value)}
						name="comment"
						value={comment}
						type="text"
						placeholder="Comments"
						className="h-full text-lg shadow-md bg-[#cad4d57] w-full outline-none rounded-xl p-4"
					/>
					<FaPaperPlane
						className="absolute right-4 top-5 text-xl cursor-pointer"
						onClick={handleSendComments}
					/>
				</div>
			</div>
		</div>
	);
}

export default Comments;
