import axios from "axios";
import { useState, useRef, useEffect } from "react";
import SummaryApi from "../../../../common";
import { toast } from "react-toastify";
import ActionButtonComment from "../../../../components/feature/comments/ActionButtonComment";
import { FaUserCircle } from "react-icons/fa";

function CommentContent({ comment, setRefreshComment, width }) {
	const [edit, setEdit] = useState(false);
	const [content, setContent] = useState(comment.content);

	const widthCss = width || "w-3/5";
	// Comment data: {username, time, content}
	const [showOptions, setShowOptions] = useState(false);

	const optionsRef = useRef(null);
	const buttonRef = useRef(null);

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
			toast.error("Please login and try again");
		}
	};

	const toggleOptions = () => {
		setShowOptions((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				optionsRef.current &&
				!optionsRef.current.contains(event.target) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target)
			) {
				setShowOptions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={`${widthCss} pt-5`}>
			<div className="flex flex-row gap-3 items-start">
				{/* Left avatar user */}
				{comment.avatar ? (
					<img
						src={comment.avatar}
						alt="User avatar"
						className="size-11 rounded-full border border-gray-400"
					/>
				) : (
					<FaUserCircle className="size-11" />
				)}
				{/* Right content: Username, time, content */}
				<div className="relative w-full">
					<div className="flex flex-row justify-between w-full items-center">
						<div className="flex flex-col gap-2 w-full">
							<div className="flex flex-row gap-3 justify-left items-center">
								<div className="text-md font-bold">
									{comment.username}
								</div>
								<div className="text-sm text-gray-500">
									{new Date(
										comment.comments_at
									).toLocaleDateString("en-GB")}
									<span> at </span>
									{new Date(
										comment.comments_at
									).toLocaleTimeString("en-GB")}
								</div>
							</div>
							{edit ? (
								<textarea
									className="text-sm outline-1 rounded-sm text-gray-700 break-words bg-transparent"
									value={content}
									onChange={handleOnChange}
									cols={content.length}
									rows={2}
								/>
							) : (
								<div className="text-sm text-gray-700 break-words">
									{content}
								</div>
							)}
							<div className="h-[1px] bg-gray-400"></div>
						</div>
						<div
							ref={buttonRef}
							className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center transition-all duration-200 active:scale-90 hover:bg-gray-300"
							onClick={toggleOptions}
						>
							<ActionButtonComment
								comment={comment}
								setRefreshComment={setRefreshComment}
								setEdit={setEdit}
							/>
						</div>
					</div>

					{edit && (
						<div className="ml-[0px] mt-2">
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
				</div>
			</div>
		</div>
	);
}

export default CommentContent;
