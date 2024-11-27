import { useState, useRef, useEffect } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

function CommentContent({ comment, setRefreshComment, width }) {
	const widthCss = width || "w-3/5";
	// Comment data: {username, time, content}
	const [showOptions, setShowOptions] = useState(false);

	const optionsRef = useRef(null);
	const buttonRef = useRef(null);

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

	// TODO: Implement edit comment and delete comment.
	const handleEditComment = () => {
		console.log("Edit comment");
	};

	const handleDeleteComment = () => {
		console.log("Delete comment");
	};
	return (
		<div className={`${widthCss} pt-5`}>
			<div className="flex flex-row gap-3 items-start">
				{/* Left avatar user */}
				<img
					src={comment.avatar}
					alt="User avatar"
					className="size-11 rounded-full border border-gray-400"
				/>
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
							<div className="text-sm text-gray-700">
								{comment.content}
							</div>
							<div className="h-[1px] bg-gray-400"></div>
						</div>
						<div
							ref={buttonRef}
							className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center transition-all duration-200 active:scale-90 hover:bg-gray-300"
							onClick={toggleOptions}
						>
							<AiOutlineEllipsis className="text-xl cursor-pointer" />
						</div>
					</div>
					{/* Options modal to edit or delete comment. */}
					{showOptions && (
						<div
							ref={optionsRef}
							className="absolute right-0 w-32 bg-white border border-gray-300 rounded-xl shadow-lg z-10"
						>
							<button
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:pl-6 hover:text-blue-600 hover:font-medium active:scale-95 transform"
								onClick={handleEditComment}
							>
								Edit
							</button>
							<div className="h-[1px] bg-gray-400"></div>
							<div className="h-[1px] bg-gray-400 transform origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></div>
							<button
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:pl-6 hover:text-red-600 hover:font-medium active:scale-95 transform"
								onClick={handleDeleteComment}
							>
								Delete
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CommentContent;
