/* eslint-disable jsx-a11y/iframe-has-title */
import { useEffect, useState } from "react";
import { FaEye, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import SummaryApi from "../../../common";
import axios from "axios";
import ButtonComment from "../../../components/feature/comments/ButtonComment";
import ButtonLike from "../../../components/feature/likes/ButtonLike";

function Popular() {
	const { sortLike } = useOutletContext();

	const [getAllPens, setGetAllPens] = useState([]);

	const navigate = useNavigate();
	// const data

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

	const handleClickPens = (pen) => {
		navigate(`/pen/${pen.id}`);
	};

	useEffect(() => {
		fetchGetAllPens();
	}, [sortLike]);

	console.log("getAllPens", getAllPens);

	return (
		<div className=" w-full h-fit py-4 pb-44">
			<div className="flex flex-wrap justify-between gap-y-8 h-fit">
				{getAllPens.length !== 0 &&
					getAllPens.map((pen, index) => (
						<div
							key={index}
							className="bg-white w-[480px] rounded-3xl h-[400px] flex flex-col items-center px-4 py-2 shadow-md"
						>
							<div className="flex items-center justify-between w-full">
								<Link to={`/info/${pen.username}`}>
									{pen.avatar ? (
										<img
											className="w-[48px] h-[48px] rounded-full border border-[#c9c9c9]"
											src={pen.avatar}
											alt="avatar"
										/>
									) : (
										<FaUserCircle className="text-5xl text-[#acacac]" />
									)}
								</Link>
								<h1 className="text-2xl text-[#9C6317] font-semibold">
									{pen.username}
								</h1>

								<div className="flex gap-2">
									<div onClick={() => handleClickPens(pen)}>
										<FaEye className="text-[32px] cursor-pointer text-[#E9B500]" />
									</div>
								</div>
							</div>
							<div className="mb-2 text-2xl text-[#434343]">
								{pen.title}
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

				{/* <div className="bg-white w-[340px] rounded-3xl h-32 flex items-center gap-4 px-4 py-2 shadow-md">
                    <FaUserCircle className="text-7xl text-[#acacac]" />

                    <div className="flex flex-col justify-between h-full">
                        <h1 className="text-lg font-semibold">Project1</h1>
                        <h2 className="-mt-3">
                            Description of this project, more and more...
                        </h2>
                        <p className="text-sm text-[#9C6317]">
                            Created at 26 September
                        </p>
                    </div>
                    <div className="h-full">
                        <FaStar className="text-[32px] text-[#E9B500]" />
                    </div>
                </div> */}
			</div>
		</div>
	);
}

export default Popular;
