import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { toast } from "react-toastify";
import SummaryApi from "../../../common";
import { AuthContext } from "../../../context/AuthContext";

function ButtonLike({ pen, sortLike }) {
	const [allLike, setAllLike] = useState([]);
	const [totalLike, setTotalLike] = useState();

	const { userData } = useContext(AuthContext);

	const totalLikes = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.totalLikePen.url}/${pen.id}`
			);

			if (response.data.success) {
				setTotalLike((prev) => response.data.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleLike = async (pen) => {
		try {
			const response = await axios.post(SummaryApi.addLike.url, {
				idProject: pen.id,
			});

			if (response.data.success) {
				toast.success("Like added successfully!");
				getAllLikeByUser();
				setTotalLike((prev) => prev + 1);
			}
		} catch (err) {
			console.log(err.message);
			toast.error("Please login and try again");
			return;
		}
	};

	const handleUnlike = async (pen) => {
		try {
			const response = await axios.post(SummaryApi.deleteLike.url, {
				idProject: pen.id,
			});

			if (response.data.success) {
				toast.success("Like removed successfully!");
				getAllLikeByUser();
				setTotalLike((prev) => prev - 1);
			} else {
				toast.error("Failed to remove like!");
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};

	const getAllLikeByUser = async () => {
		if (userData.id) {
			try {
				const response = await axios.get(
					SummaryApi.getAllLikeByUser.url
				);
				if (response.data.success) {
					setAllLike(response.data.data);
				}
			} catch (err) {
				console.log(err.message);
				return;
			}
		}
	};

	useEffect(() => {
		getAllLikeByUser();
		totalLikes();
	}, [sortLike, pen.id]);

	return (
		<div className="w-fit rounded-xl flex gap-1 items-center justify-center">
			{allLike.find((project) => project.id_project === pen.id) ? (
				<FaRegArrowAltCircleUp
					onClick={() => handleUnlike(pen)}
					className="text-[16px] cursor-pointer text-red-600"
				/>
			) : (
				<FaRegArrowAltCircleUp
					onClick={() => handleLike(pen)}
					className="text-[16px] cursor-pointer text-[#545454]"
				/>
			)}
			<p className="text-[#545454] text-[16px]">
				{totalLike ? totalLike : 0}
			</p>
		</div>
	);
}

export default ButtonLike;
