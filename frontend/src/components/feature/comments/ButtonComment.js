import axios from "axios";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import SummaryApi from "../../../common";
import Comments from "./Comments";

function ButtonComment({ pen }) {
	const [openComment, setOpenComment] = useState(false);
	const [totalComment, setTotalComment] = useState();
	const [project, setProject] = useState("");
	const [refreshComments, setRefreshComments] = useState(false);

	// const totalComments = async () => {
	// 	try {
	// 		const response = await axios.get(SummaryApi.totalComments.url);
	// 		if (response.data.success) {
	// 			console.log("response.data.data????", response.data.data);
	// 			for (let i = 0; i < response.data.data.length; i++) {
	// 				setTotalComment((prev) => ({
	// 					...prev,
	// 					[response.data.data[i].id]:
	// 						response.data.data[i].total_comments,
	// 				}));
	// 			}
	// 		}
	// 	} catch (err) {
	// 		console.log(err.message);
	// 	}
	// };
	const totalComments = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.totalCommentPen.url}/${pen.id}`
			);
			if (response.data.success) {
				setTotalComment(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleOpenComment = (pen) => {
		setOpenComment(true);
		setProject(pen);
	};

	useEffect(() => {
		totalComments();
	}, [refreshComments]);
	return (
		<div className="w-fit rounded-xl flex gap-1 items-center justify-center">
			<FaComment
				onClick={() => handleOpenComment(pen)}
				className="text-[16px] cursor-pointer text-[#545454] hover:opacity-80"
			/>

			{openComment && (
				<Comments
					setOpen={setOpenComment}
					project={project}
					refresh={setRefreshComments}
				/>
			)}
			<p className="text-[#545454] text-[16px]">
				{totalComment ? totalComment : 0}
			</p>
		</div>
	);
}

export default ButtonComment;
