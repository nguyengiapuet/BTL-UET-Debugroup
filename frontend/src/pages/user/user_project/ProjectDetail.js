import { useContext, useEffect, useState } from "react";
import SummaryApi from "../../../common";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import ButtonLike from "../../../components/feature/likes/ButtonLike";
import LabelComment from "./comment_components/LabelComment";
import ListComment from "./comment_components/ListComment";
import InputComment from "./comment_components/InputComment";
import { AuthContext } from "../../../context/AuthContext";

function ProjectDetail() {
	const location = useLocation();
	const params = useParams();
	const [dataPen, setDataPen] = useState({});
	const [refreshComment, setRefreshComment] = useState(false);
	const { userData } = useContext(AuthContext);

	useEffect(() => {
		document.title = "Project detail";
	});

	const handleLoadPens = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.getPens.url}/${params.id}`
			);
			if (response.data.success) {
				setDataPen(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		if (params.id !== undefined) {
			handleLoadPens();
		}
	}, [location]);

	return (
		<div className="px-20 py-10 overflow-y-auto w-full h-screen flex flex-col gap-10">
			{/* Project detail top content*/}
			<div className="flex flex-row w-full justify-between items-center">
				{/* Left content of project detail */}
				<div className="flex flex-col gap-3">
					{/* User information */}
					<div className="flex flex-row gap-3 justify-start items-center">
						<img
							alt=""
							src={dataPen?.avatar}
							className="size-12 rounded-full border border-gray-300"
						/>
						<div className="flex flex-col">
							<div className="text-md font-bold">
								{dataPen?.username}
							</div>
							<div className="text-sm font-medium text-gray-500">
								Contact: {dataPen?.email}
							</div>
						</div>
					</div>
					{/* Project information */}
					<div className="text-xl font-bold">{dataPen?.title}</div>
					<div className="flex h-4 flex-row justify-between items-center gap-2 text-[15px] text-gray-500">
						<div className="">Project preview</div>
						<div className="h-full w-[1px] bg-gray-500"></div>
						<ButtonLike pen={dataPen} />
						<div className="h-full w-[1px] bg-gray-500"></div>
						<LabelComment
							pen={dataPen}
							refreshComment={refreshComment}
						/>
					</div>
					{/* View source button */}
					<Link
						className="w-fit h-fit mt-5 bg-[#fe5b16] rounded-md px-5 py-2 text-sm text-white font-bold hover:bg-[#fe5b16]/80"
						to={`/pen/${params?.id}`}
					>
						View source
					</Link>
				</div>
				{/* Right content of project detail: Preview Iframe*/}
				<div className="bg-white rounded-3xl shadow-md min-w-[680px] flex justify-center items-center">
					<iframe
						className="max-w-[600px] rounded-2xl w-full min-h-[330px] my-10"
						srcDoc={dataPen?.output}
					/>
				</div>
			</div>
			{/* Middle content */}
			<div className="flex flex-col gap-2">
				<div className="text-md font-bold text-black">About</div>
				<div className="w-full h-[1px] bg-gray-400"></div>
				<div className="text-sm text-gray-500 w-2/3">
					Explore our Mobile Product Review template designed to help
					you present ideas, get alignment, and gather feedback
					effectively. This template is structured to guide you
					through key sections such as an overview of the mobile
					product, key features, research insights, roadmap vision,
					and design concepts. Use this Mobile Product Review template
					to ensure a thorough and engaging presentation, keeping your
					audience informed and involved in the feedback process.
				</div>
			</div>
			{/* Bottom content: comments */}
			<div className="flex flex-col gap-2 pb-10">
				<div className="text-md font-bold text-black">Comments</div>
				<div className="w-full h-[1px] bg-gray-400"></div>
				{userData.id && (
					<div className="w-3/5 h-12 rounded-xl flex flex-row items-center justify-between relative mt-3 border-[1px] border-gray-200 focus-within:border-[#9CA3AF]">
						<InputComment
							project={dataPen}
							setRefreshComment={setRefreshComment}
							avatar={userData?.avatar}
						/>
					</div>
				)}
				<LabelComment pen={dataPen} refreshComment={refreshComment} />
				<ListComment
					project={dataPen}
					refreshComment={refreshComment}
					setRefreshComment={setRefreshComment}
				/>
			</div>
		</div>
	);
}

export default ProjectDetail;
