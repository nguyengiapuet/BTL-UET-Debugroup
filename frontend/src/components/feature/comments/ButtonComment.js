import axios from "axios";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import SummaryApi from "../../../common";
import Comments from "./Comments";

function ButtonComment({ pen }) {
	const [openComment, setOpenComment] = useState(false);
	const [totalComment, setTotalComment] = useState({});
	const [project, setProject] = useState("");
	const [refreshComments, setRefreshComments] = useState(false);

	const totalComments = async () => {
		try {
			const response = await axios.get(SummaryApi.totalComments.url);
			if (response.data.success) {
				console.log("response.data.data????", response.data.data);
				for (let i = 0; i < response.data.data.length; i++) {
					setTotalComment((prev) => ({
						...prev,
						[response.data.data[i].id_project]:
							response.data.data[i].total_comments,
					}));
				}
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
		<div className="px-3 py-1 ml-2 bg-[#cfcfcf] w-fit rounded-xl flex gap-1 items-center justify-center">
			<p className="text-[#545454] text-xl">
				{totalComment[pen.id] ? totalComment[pen.id] : 0}
			</p>

			<FaComment
				onClick={() => handleOpenComment(pen)}
				className="text-[24px] cursor-pointer text-[#545454] hover:opacity-80"
			/>

			{openComment && (
				<Comments
					setOpen={setOpenComment}
					project={project}
					refresh={setRefreshComments}
				/>
			)}
		</div>
	);
}

export default ButtonComment;
