import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SummaryApi from "../../../common";
import axios from "axios";
import ProjectCard from "./project_components/ProjectCard";
import { AuthContext } from "../../../context/AuthContext";

function Popular() {
	const { sortLike } = useOutletContext();

	const { userData } = useContext(AuthContext);
	const [getAllPens, setGetAllPens] = useState([]);

	const fetchGetAllPens = async () => {
		try {
			const response = await axios.get(SummaryApi.allPens.url);

			if (response.data.success) {
				console.log(response.data.data);
				if (sortLike) setGetAllPens(sortLike(response.data.data));
				else setGetAllPens(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};

	useEffect(() => {
		fetchGetAllPens();
	}, [sortLike]);

	console.log("getAllPens", getAllPens);

	return (
		<div className=" h-fit py-4 pb-44">
			<div className="flex flex-wrap gap-x-[30px] gap-y-10 h-fit">
				{getAllPens.length !== 0 &&
					getAllPens.map((pen, index) => (
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

export default Popular;
