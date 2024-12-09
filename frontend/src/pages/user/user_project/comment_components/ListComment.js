import { useEffect, useState } from "react";
import CommentContent from "./CommentContent";
import axios from "axios";
import SummaryApi from "../../../../common";

function ListComment({ project, refreshComment, setRefreshComment }) {
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
	}, [project.id, refreshComment]);

	return (
		<>
			<div className="w-full flex flex-col mb-16 gap-2 pb-2">
				{allComments.length > 0 ? (
					allComments.map((comment) => (
						<CommentContent
							key={comment.id}
							comment={comment}
							setRefreshComment={setRefreshComment}
						/>
					))
				) : (
					<div className="text-center text-2xl text-gray-500 font-semibold my-10">
						No one has comment yet!
					</div>
				)}
			</div>
		</>
	);
}

export default ListComment;
