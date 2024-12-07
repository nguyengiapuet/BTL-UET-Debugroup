import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SummaryApi from "../../../common";
import axios from "axios";
import ProjectCard from "./project_components/ProjectCard";
import { AuthContext } from "../../../context/AuthContext";

function Upvoted() {
	const { sortLike } = useOutletContext();

	const { userData } = useContext(AuthContext);
	const [allUpvotePen, setUpvotePen] = useState([]);

	const fetchAllUpvotePens = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.allUpvotePen.url}/${userData.id}`
			);
			if (response.data.success) {
				console.log(response.data.data);
				if (sortLike) setUpvotePen(sortLike(response.data.data));
				else setUpvotePen(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};

	useEffect(() => {
		fetchAllUpvotePens();
	}, [sortLike]);

	return (
		<div className=" h-fit py-4 pb-44">
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
