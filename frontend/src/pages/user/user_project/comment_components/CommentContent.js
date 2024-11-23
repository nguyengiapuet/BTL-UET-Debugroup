function CommentContent(commentData) {
	// Comment data: {username, time, content}
	const exampleComment = {
		username: "Surendhiran Natarajan",
		time: "20 days ago",
		content:
			"Hi Whish you all am Surendhiran Natarajan Chennai Avadi new in this group please help to learn UX and UI, and achieve the target thank you friends",
	};
	return (
		<div className="w-3/5 pt-5">
			<div className="flex flex-row gap-3 items-start">
				{/* Left avatar user */}
				<div className="h-10 min-w-10 rounded-full bg-red-500 border-[1px] border-gray-200"></div>
				{/* Right content: Username, time, content */}
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row gap-3 justify-left items-center">
						<div className="text-md font-bold">
							{exampleComment.username}
						</div>
						<div className="text-sm text-gray-500">
							{exampleComment.time}
						</div>
					</div>
					<div className="text-sm text-gray-700">
						{exampleComment.content}
					</div>
					<div className="h-[1px] bg-gray-400"></div>
				</div>
			</div>
		</div>
	);
}

export default CommentContent;
