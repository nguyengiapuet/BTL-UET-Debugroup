import { useState } from "react";
import SummaryApi from "../../../../common";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

function InputComment({ project, setRefreshComment, avatar }) {
	const [comment, setComment] = useState("");

	const handleSendComments = async () => {
		try {
			const response = await axios.post(SummaryApi.sendComments.url, {
				idProject: project.id,
				content: comment,
			});

			if (response.data.success) {
				toast.success(response.data.message);

				// getAllCommentsByProject();
				setRefreshComment((prev) => !prev);
				setComment("");
			}
		} catch (err) {
			console.log(err.message);
		}
	};
	const handleEnter = async (e) => {
		if (e.key === "Enter" && e.target.value.length > 0) {
			await handleSendComments();
		}
	};

	return (
		<>
			<input
				onKeyDown={handleEnter}
				onChange={(e) => setComment(e.target.value)}
				name="comment"
				value={comment}
				type="text"
				placeholder="Comments"
				className="h-full text-sm shadow-md bg-[#cad4d57] w-full outline-none rounded-xl px-[55px]"
			/>
			{avatar ? (
				<img
					alt=""
					src={avatar}
					className="h-9 w-9 rounded-full bg-gray-300 absolute left-2"
				/>
			) : (
				<FaUserCircle className="size-10  absolute left-2" />
			)}

			<FaPaperPlane
				className="text-md cursor-pointer absolute right-5"
				onClick={handleSendComments}
			/>
		</>
	);
}

export default InputComment;
