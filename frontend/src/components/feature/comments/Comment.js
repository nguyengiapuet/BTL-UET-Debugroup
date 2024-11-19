import { FaUserCircle } from "react-icons/fa";
import ActionButtonComment from "./ActionButtonComment";
import { useState } from "react";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";

function Comment({ comment, setRefreshComment }) {
	const [edit, setEdit] = useState(false);
	const [content, setContent] = useState(comment.content);
	const handleOnChange = (e) => {
		setContent(e.target.value);
	};

	const handleCancel = () => {
		setEdit(false);
		setContent(comment.content);
	};

	const handleSaveComment = async () => {
		try {
			const response = await axios.post(
				SummaryApi.editCommentByUser.url,
				{
					idComment: comment.id,
					content: content,
					timeNow: new Date()
						.toISOString()
						.slice(0, 19)
						.replace("T", " "),
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setEdit(false);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<div className="px-4 w-full text-lg py-2 flex gap-2">
				{comment.avatar ? (
					<img
						src={comment.avatar}
						alt="avt"
						className="h-[48px] w-[48px] rounded-full border border-[#4f4f4f]"
					/>
				) : (
					<FaUserCircle className="text-5xl" />
				)}
				<div className="bg-[#cad4d5] px-2 py-1 w-fit rounded-md overflow-hidden">
					<p className="text-lg font-medium">{comment.username}</p>
					{edit ? (
						<textarea
							value={content}
							className="bg-transparent outline outline-1 px-2 rounded-sm w-full overflow-y"
							onChange={handleOnChange}
							cols={content.length}
							rows={2}
						/>
					) : (
						<div className="bg-transparent rounded-sm break-words">
							{content}
						</div>
					)}
				</div>
				<ActionButtonComment
					comment={comment}
					setComment={setRefreshComment}
					setEdit={setEdit}
				/>
			</div>
			{edit && (
				<div className="ml-[72px]">
					<button
						onClick={handleSaveComment}
						className="bg-green-500 py-1 text-white rounded-md hover:bg-opacity-90 px-4"
					>
						Save
					</button>
					<button
						onClick={handleCancel}
						className="bg-red-500 py-1 text-white rounded-md hover:bg-opacity-90 px-2 ml-2"
					>
						Cancel
					</button>
				</div>
			)}
		</>
	);
}

export default Comment;
