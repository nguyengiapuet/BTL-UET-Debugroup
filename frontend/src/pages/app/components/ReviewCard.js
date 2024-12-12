function ReviewCard({ data }) {
	console.log("trst", data);
	return (
		<div class="bg-white rounded-lg shadow-md p-6">
			<div class="flex items-center gap-4">
				<img
					src={data.avatar || "https://via.placeholder.com/64"}
					alt="User Avatar"
					class="w-16 h-16 rounded-full border"
				/>
				<div>
					<h3 class="text-lg font-semibold">{data.username}</h3>
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
			<p class="mt-4 text-gray-600">{data.content} </p>
		</div>
	);
}

export default ReviewCard;
