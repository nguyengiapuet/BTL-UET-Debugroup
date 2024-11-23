import { useEffect, useState } from "react";
import SummaryApi from "../../../common";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import CommentContent from "./comment_components/CommentContent";

function ProjectDetail() {
	const params = useParams();
	const [dataPen, setDataPen] = useState({});
	const handleLoadPens = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.getPens.url}/${params.id}`
			);
			if (response.data.success) {
				console.log("response.data.data", response.data.data);
				setDataPen(response.data.data);
			} else {
				console.log("response.data.message", response.data.message);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		if (params.id !== undefined) {
			handleLoadPens();
		}
	}, []);
	return (
		<div className="px-20 py-10 overflow-y-auto w-full h-screen flex flex-col gap-10">
			{/* Project detail top content*/}
			<div className="flex flex-row w-full justify-between items-center">
				{/* Left content of project detail */}
				<div className="flex flex-col gap-3">
					{/* User information */}
					<div className="flex flex-row gap-3 justify-start items-center">
						<div className="h-10 w-10 rounded-full bg-gray-300"></div>
						<div className="flex flex-col">
							<div className="text-md font-bold">Admin</div>
							<div className="text-sm font-medium text-gray-500">
								Contact: {dataPen.email}
							</div>
						</div>
					</div>
					{/* Project information */}
					<div className="text-xl font-bold">{dataPen.title}</div>
					<div className="flex h-4 flex-row justify-between items-center gap-2 text-[15px] text-gray-500">
						<div className="">Project preview</div>
						<div className="h-full w-[1px] bg-gray-500"></div>
						<div>2.7k likes</div>
						<div className="h-full w-[1px] bg-gray-500"></div>
						<div>100 comments</div>
					</div>
					{/* View source button */}
					<Link
						className="w-fit h-fit mt-5 bg-[#fe5b16] rounded-md px-5 py-2 text-sm text-white font-bold hover:bg-[#fe5b16]/80"
						to={`/pen/${params.id}`}
					>
						View source
					</Link>
				</div>
				{/* Right content of project detail: Preview Iframe*/}
				<div className="bg-white rounded-3xl shadow-md min-w-[680px] flex justify-center items-center">
					<iframe
						className="max-w-[600px] rounded-2xl w-full min-h-[330px] my-10"
						srcDoc={dataPen.output}
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
				<div className="w-3/5 h-12 rounded-xl flex flex-row items-center justify-between relative mt-3 border-[1px] border-gray-200 focus-within:border-[#9CA3AF]">
					<input
						name="comment"
						type="text"
						placeholder="Add a comment..."
						className="h-full text-sm shadow-md bg-[#cad4d57] w-full outline-none rounded-xl px-12"
					/>
					<div className="h-9 w-9 rounded-full bg-gray-300 absolute left-2"></div>
					<FaPaperPlane className="text-md cursor-pointer absolute right-5" />
				</div>
				<div>17 Comments</div>
				<div className="w-full flex flex-col gap-2">
					<CommentContent />
					<CommentContent />
					<CommentContent />
				</div>
			</div>
		</div>
	);
}

export default ProjectDetail;
