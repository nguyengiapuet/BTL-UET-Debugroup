/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
import SummaryApi from "../../../common";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import ButtonComment from "../../../components/feature/comments/ButtonComment";
import ButtonLike from "../../../components/feature/likes/ButtonLike";

function MyProject() {
	const { sortLike } = useOutletContext();

	const [getAllPens, setGetAllPens] = useState([]);
	const { userData } = useContext(AuthContext);

	const navigate = useNavigate();

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

	const handleClickPens = (pen) => {
		navigate(`/pen/${pen.id}`);
	};

	useEffect(() => {
		fetchGetAllPens();
	}, [sortLike]);

	return (
		<div className=" w-full h-fit py-4 pb-32">
			<div className="flex flex-wrap justify-between gap-y-8 h-fit">
				{getAllPens.length !== 0 &&
					getAllPens.map((pen, index) => (
						<div
							key={index}
							className="bg-white w-[480px] rounded-3xl h-[400px] flex flex-col items-center gap-4 px-4 py-2 shadow-md"
						>
							<div className="flex h-20 items-center justify-between w-full">
								{pen.avatar ? (
									<img
										className="w-[48px] h-[48px] rounded-full border border-[#c9c9c9]"
										src={pen.avatar}
										alt="avatar"
									/>
								) : (
									<FaUserCircle className="text-5xl text-[#acacac]" />
								)}
								<h1 className="text-2xl text-[#9C6317] font-semibold">
									{pen.title}
								</h1>

								<div className="flex gap-2">
									<div onClick={() => handleClickPens(pen)}>
										<FaEdit className="text-[32px] cursor-pointer text-[#E9B500]" />
									</div>

									<div onClick={() => handleRemove(pen)}>
										<FaTrash className="text-[32px] cursor-pointer text-[#E9B500]" />
									</div>
								</div>
							</div>
							<iframe
								className="w-full h-full rounded-2xl overflow-x-hidden overflow-y-auto"
								srcDoc={pen.output}
							/>

							<div className="w-full flex pt-4">
								<ButtonLike pen={pen} sortLike={sortLike} />
								<ButtonComment pen={pen} />
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default MyProject;
