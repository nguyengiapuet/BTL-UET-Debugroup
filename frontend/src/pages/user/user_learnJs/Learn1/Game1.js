import axios from "axios";
import SummaryApi from "../../../../common";
import { useEffect, useState } from "react";
import {
	FaArrowLeft,
	FaQuestionCircle,
	FaThumbsDown,
	FaThumbsUp,
} from "react-icons/fa";
import "../Learn1/style.css";
import { Link } from "react-router-dom";
const Game1 = () => {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [score, setScore] = useState(0);
	const [status, setStatus] = useState(false);
	useEffect(() => {
		const question = async () => {
			try {
				const response = await axios.get(
					`${SummaryApi.getQuestion1.url}`
				);
				if (response.data.success) {
					setData(response.data.data);
				} else {
					console.log("response.data.message", response.data.message);
				}
			} catch (err) {
				console.log(err.message);
			}
		};
		question();
	}, []);
	const item = data[count];
	const handleClickItem = (e) => {
		if (e.target.textContent === item.result) {
			e.target.classList.add("correct");
			setScore(score + 1);
		} else {
			const options = document.querySelectorAll("p");
			e.target.classList.add("incorrect");
			options.forEach((items) => {
				console.log();
				if (items.textContent === item.result) {
					items.classList.add("correct");
				}
			});
		}
		const options = document.querySelectorAll("p");
		options.forEach((item) => item.classList.add("disabled"));
		setStatus(true);
	};
	const handleNext = () => {
		console.log(score);
		setStatus(false);
		const next = document.querySelectorAll("p");
		next.forEach((item) => item.classList.remove("incorrect"));
		next.forEach((item) => item.classList.remove("correct"));
		next.forEach((item) => item.classList.remove("disabled"));
		setCount(count + 1);
	};
	return count > 9 ? (
		<div className="flex justify-center ">
			<div className="px-[100px] py-[100px] bg-slate-600 mt-28 rounded-2xl">
				{score > 5 ? (
					<FaThumbsUp size={150} className="mx-9" />
				) : (
					<FaThumbsDown size={150} className="mx-9" />
				)}
				<h1
					className={`text-[25px] mt-6 ${
						score > 6 ? "text-green-500" : "text-red-700"
					}`}
				>
					Điểm của bạn là: {score}/10
				</h1>
				<p className="mt-10">
					<Link
						to={"/learn"}
						className="px-10 py-3 bg-slate-400 rounded-lg transition-transform duration-200 hover:scale-105 hover:rounded-lg hover:bg-[#ccc] mx-16"
					>
						Ok
					</Link>
				</p>
			</div>
		</div>
	) : (
		<div className="px-[300px] py-[100px] bg-purple-400 ">
			{item && (
				<div className="px-[50px] py-[50px] bg-slate-600 shadow-2xl rounded-xl">
					<div className="flex justify-between items-center border-b border-black px-4 py-2">
						<p className="text-xl font-semibold">{`Câu ${item.id}:`}</p>
					</div>
					<div className="">
						<h1 className="text-left text-xl font-bold my-4 mx-2 ">
							{item.question}
						</h1>
						<p
							className="block w-full text-left bg-gray-200 hover:opacity-85 p-4 rounded-md mb-4 cursor-pointer "
							onClick={handleClickItem}
						>
							{item.a}
						</p>
						<p
							className="block w-full text-left bg-gray-200 hover:opacity-85 p-4 rounded-md mb-4 cursor-pointer"
							onClick={handleClickItem}
						>
							{item.b}
						</p>
						<p
							className="block w-full text-left bg-gray-200 hover:opacity-85 p-4 rounded-md mb-4 cursor-pointer"
							onClick={handleClickItem}
						>
							{item.c}
						</p>
					</div>
					<div className="flex justify-between items-center border-t border-black px-4 py-2">
						<div className="flex items-center gap-x-2">
							<FaQuestionCircle />
							{` ${count + 1}/${data.length}`}
						</div>
						<Link
							to={"/learn"}
							className="bg-red-500 rounded-md px-4 py-2 cursor-pointer flex items-center gap-x-1 hover:scale-110"
						>
							<FaArrowLeft /> <span>Exit</span>
						</Link>
						<div>
							<p
								class={`bg-green-600 text-white rounded-md px-4 py-2 cursor-pointer ${
									status
										? ""
										: "opacity-50 pointer-events-none"
								}`}
								onClick={handleNext}
							>
								Continue
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Game1;
