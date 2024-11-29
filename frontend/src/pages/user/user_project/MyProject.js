import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SummaryApi from "../../../common";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import ProjectCard from "./project_components/ProjectCard";
import { FaEdit, FaTrash } from "react-icons/fa";

function MyProject() {
	const { sortLike } = useOutletContext();
	const navigate = useNavigate();

	const [getAllPens, setGetAllPens] = useState([]);
	const { userData } = useContext(AuthContext);

	const fetchGetAllPens = async () => {
		try {
			const response = await axios.post(SummaryApi.getAllPens.url, {
				username: userData.username,
			});

			if (response.data.success) {
				console.log(response.data.data);
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
		fetchGetAllPens();
	}, [sortLike]);

	return (
		<div className="w-full flex flex-wrap gap-x-[30px] gap-y-10 h-fit py-4 pb-32">
			{getAllPens.length !== 0 &&
				getAllPens.map((pen, index) => (
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
		</div>
	);
}

export default MyProject;
