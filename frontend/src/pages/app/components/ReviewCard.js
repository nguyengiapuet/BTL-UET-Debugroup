function ReviewCard({ data }) {
	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<div className="flex items-center gap-4">
				<img
					src={data.avatar || "https://via.placeholder.com/64"}
					alt="User Avatar"
					className="w-16 h-16 rounded-full border"
				/>
				<div>
					<h3 className="text-lg font-semibold">{data.username}</h3>
					<div className="flex items-center gap-1">
						{[...Array(5)].map((_, index) => (
							<span
								key={index}
								className={
									index < data.number_star
										? "text-yellow-400"
										: "text-gray-400"
								}
							>
								★
							</span>
						))}
					</div>
				</div>
			</div>
			<p className="mt-4 text-gray-600">{data.content} </p>
		</div>
	);
}

export default ReviewCard;
