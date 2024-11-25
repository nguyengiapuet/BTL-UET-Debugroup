import axios from "axios";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import SummaryApi from "../../../../common";

function LabelComment({ pen, refreshComment }) {
	const [totalComment, setTotalComment] = useState();

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

	useEffect(() => {
		totalComments();
	}, [pen.id, refreshComment]);
	return (
		<div className="w-fit rounded-xl flex gap-1 items-center justify-center">
			<FaComment className="text-[16px] cursor-pointer text-[#545454] hover:opacity-80" />
			<p className="text-[#545454] text-[16px]">
				{totalComment ? totalComment : 0}
			</p>
			<div className="text-[#545454] text-[16px]">comments</div>
		</div>
	);
}

export default LabelComment;
