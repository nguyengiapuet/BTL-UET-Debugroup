import { useContext, useEffect, useState } from "react";
import {
	FaCodeBranch,
	FaFire,
	FaRegArrowAltCircleUp,
	FaSortAlphaDown,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function Home() {
	const [active, setActive] = useState("popular");
	const [sort, setSort] = useState(false);
	const { setTitle, userData } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleClickTitle = (e) => {
		setActive(e.target.textContent.toLowerCase());
		setTitle(e.target.textContent);
	};

	const sortLike = (listProject) => {
		const a = listProject.sort((a, b) => b.total_likes - a.total_likes);
		return a;
	};

	useEffect(() => {
		navigate("/popular");
	}, []);

	return (
		<div className="w-full h-screen bg-[#eff2f7] overflow-auto overflow-y-scroll">
			<div className=" w-full h-full flex items-center flex-col bg-[#eff2f7]">
				<div className="flex h-full w-[90%] xl:w-[1080px] mt-24 flex-col gap-6">
					<div className="flex justify-between w-full border-b border-[#aaa] pb-4">
						<div className="flex sm:gap-2 lg:gap-8 items-center">
							<Link
								onClick={handleClickTitle}
								to={"/popular"}
								className={
									`${
										active === "popular"
											? "bg-[#9c6317] text-white"
											: "bg-indigo-200 text-black"
									} ` +
									"flex items-center gap-2 rounded-lg font-medium py-[5px] px-5 cursor-pointer text-md shadow-md hover:bg-[#9c6317] hover:text-white"
								}
							>
								<FaFire
									className={
										`${
											active === "popular"
												? "text-red-500"
												: "text-black"
										} ` + "text-md"
									}
								/>
								Popular
							</Link>
							<Link
								onClick={handleClickTitle}
								to={"/upvoted"}
								className={
									`${
										active === "upvoted"
											? "bg-[#9c6317] text-white"
											: "bg-indigo-200 text-black"
									} ` +
									"flex items-center gap-2 rounded-lg font-medium py-[5px] px-5 cursor-pointer text-md shadow-md hover:bg-[#9c6317] hover:text-white"
								}
							>
								<FaRegArrowAltCircleUp
									className={
										`${
											active === "upvoted"
												? "text-[#35ff2e]"
												: "text-black"
										} ` + "text-md"
									}
								/>
								Upvoted
							</Link>
							<Link
								onClick={handleClickTitle}
								to={"/myproject"}
								className={
									`${
										active === "my projects"
											? "bg-[#9c6317] text-white"
											: "bg-indigo-200 text-black"
									} ` +
									"flex items-center gap-2 rounded-lg font-medium py-[5px] px-5 cursor-pointer text-md shadow-md hover:bg-[#9c6317] hover:text-white"
								}
							>
								<FaCodeBranch
									className={
										`${
											active === "my projects"
												? "text-[#2ecbff]"
												: "text-black"
										} ` + "text-md"
									}
								/>
								My projects
							</Link>
						</div>
						<div
							onClick={() => setSort(!sort)}
							className="hover:bg-gray-200 hover:text-white border-[1px] border-gray-600 py-1 px-4 cursor-pointer rounded-lg font-medium text-[#626262] text-md gap-2 flex items-center"
						>
							<p className="text-sm text-black font-bold">Sort</p>
							<FaSortAlphaDown className="text-[#9c6317]" />
						</div>
					</div>

					<Outlet
						context={sort ? { sortLike } : { sortLike: null }}
					/>
				</div>
			</div>

			{userData.id && (
				<div className="w-full flex items-center justify-center">
					<Link
						to={"/pen"}
						className="coding-btn animated-button1 fixed h-12 w-48 font-semibold cursor-pointer flex items-center justify-center text-xl text-white bottom-8"
					>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						Start Coding
					</Link>
				</div>
			)}
		</div>
	);
}

export default Home;
