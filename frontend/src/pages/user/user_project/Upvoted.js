import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SummaryApi from "../../../common";
import axios from "axios";
import ProjectCard from "./project_components/ProjectCard";
import { AuthContext } from "../../../context/AuthContext";
import { FaInfoCircle } from "react-icons/fa";
import Loading from "../../../components/animations/Loading";

function Upvoted() {
	const { sortLike } = useOutletContext();

	const { userData } = useContext(AuthContext);
	const [allUpvotePen, setUpvotePen] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchAllUpvotePens = async () => {
		try {
			const response = await axios.get(SummaryApi.allUpvotePen.url);
			if (response.data.success) {
				if (sortLike) setUpvotePen(sortLike(response.data.data));
				else setUpvotePen(response.data.data);
			}
		} catch (err) {
			console.log("Login to upvote and store your interest project!");
			return;
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchAllUpvotePens();
		setIsLoading(false);
	}, [sortLike]);

	useEffect(() => {
		document.title = "Upvote";
	}, []);

	if (!userData.id || allUpvotePen.length === 0) {
		return (
			<div className="text-md justify-center flex flex-row items-center gap-2 w-full mt-8">
				<FaInfoCircle className="text-yellow-600" />
				You don't have any upvoted projects yet!
			</div>
		);
	}

	return (
		<div className=" h-fit py-4 pb-44">
			{isLoading && <Loading />}
			<div className="flex flex-wrap gap-x-[30px] gap-y-10 h-fit">
				{allUpvotePen.length !== 0 &&
					allUpvotePen.map((pen, index) => (
						<ProjectCard
							key={index}
							pen={pen}
							userData={userData}
							sortLike={sortLike}
						/>
					))}
			</div>
		</div>
	);
}

export default Upvoted;
