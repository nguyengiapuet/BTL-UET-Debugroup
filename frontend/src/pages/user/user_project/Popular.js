import { useContext, useEffect, useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import SummaryApi from "../../../common";
import axios from "axios";
import ProjectCard from "./project_components/ProjectCard";
import { AuthContext } from "../../../context/AuthContext";
import Loading from "../../../components/animations/Loading";

function Popular() {
	const { sortLike } = useOutletContext();
	const { userData } = useContext(AuthContext);
	const [getAllPens, setGetAllPens] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();

	const fetchGetAllPens = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(SummaryApi.allPensPublic.url);

			if (response.data.success) {
				if (sortLike) setGetAllPens(sortLike(response.data.data));
				else setGetAllPens(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
		setIsLoading(false);
	};

	const searchPenByName = async (query) => {
		setIsLoading(true);
		try {
			const response = await axios.post(SummaryApi.searchPenPublic.url, {
				query: query,
			});

			if (response.data.success) {
				if (sortLike) setGetAllPens(sortLike(response.data.data));
				else setGetAllPens(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const query = queryParams.get("query");
		if (query) {
			searchPenByName(query);
		} else fetchGetAllPens();
	}, [sortLike, location.search]);

	useEffect(() => {
		document.title = "Popular";
	}, []);

	return (
		<div className=" h-fit py-4 pb-44">
			{isLoading && <Loading/>}
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
