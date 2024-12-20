import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SummaryApi from "../../../common";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import ProjectCard from "./project_components/ProjectCard";
import { FaInfoCircle } from "react-icons/fa";
import Loading from "../../../components/animations/Loading";

function MyProject() {
	const { sortLike } = useOutletContext();
	const navigate = useNavigate();

	const [getAllPens, setGetAllPens] = useState([]);
	const { userData } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		document.title = "My projects";
	}, []);

	const fetchGetAllPens = async () => {
		try {
			const response = await axios.post(SummaryApi.getAllPensUser.url, {
				username: userData.username,
			});

			if (response.data.success) {
				if (sortLike) {
					setGetAllPens(sortLike(response.data.data));
				} else {
					setGetAllPens(response.data.data);
				}
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};
	const handleClickPens = (pen) => {
		navigate(`/pen/${pen.id}`);
	};

	const handleRemove = async (pen) => {
		try {
			const response = await axios.delete(
				`${SummaryApi.deletePens.url}/${pen.id}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchGetAllPens();
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchGetAllPens();
		setIsLoading(false);
	}, [sortLike]);

	return (
		<div className="w-full flex flex-wrap gap-x-[30px] gap-y-10 h-fit py-4 pb-32">
			{isLoading && <Loading />}
			{getAllPens.length === 0 ? (
				<div className="text-md justify-center flex flex-row items-center gap-2 w-full mt-4">
					<FaInfoCircle className="text-yellow-600" />
					You don't have any projects yet!
				</div>
			) : (
				<>
					{getAllPens.map((pen, index) => (
						<ProjectCard
							key={index}
							pen={pen}
							userData={userData}
							sortLike={sortLike}
							owner={true}
							handleClickPens={handleClickPens}
							handleRemove={handleRemove}
						/>
					))}
				</>
			)}
		</div>
	);
}

export default MyProject;
