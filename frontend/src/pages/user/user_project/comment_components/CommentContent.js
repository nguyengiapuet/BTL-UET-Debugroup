function CommentContent({ comment, setRefreshComment, width }) {
	const widthCss = width || "w-3/5";
	// Comment data: {username, time, content}

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
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row gap-3 justify-left items-center">
						<div className="text-md font-bold">
							{comment.username}
						</div>
						<div className="text-sm text-gray-500">
							{comment.comments_at}
						</div>
					</div>
					<div className="text-sm text-gray-700">
						{comment.content}
					</div>
					<div className="h-[1px] bg-gray-400"></div>
				</div>
			</div>
		</div>
	);
}

export default CommentContent;
