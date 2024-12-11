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
		<div className="h-screen px-[150px] py-[100px] flex items-center justify-center">
			<div className="m-auto my-auto h-fit w-4/5 rounded-3xl bg-gradient-to-b from-blue-100 via-white to-blue-100 shadow-xl text-center">
				<div className="flex justify-center items-center mt-5">
					{score > 5 ? (
						<FaThumbsUp
							size={70}
							className="text-green-500 animate-bounce"
						/>
					) : (
						<FaThumbsDown
							size={70}
							className="text-red-500 animate-shake"
						/>
					)}
				</div>
				<h1
					className={`text-3xl font-bold mt-6 ${
						score > 5 ? "text-green-600" : "text-red-600"
					}`}
				>
					Your Score: {score}/10
				</h1>
				<p className="text-gray-700 mt-4">
					{score > 5
						? "Great job! Keep up the good work!"
						: "Don't worry, you'll do better next time!"}
				</p>
				<div className="my-10">
					<Link
						to={"/learn"}
						className="px-6 py-3 text-lg bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-transform duration-200 transform hover:scale-105"
					>
						Continue Learning
					</Link>
				</div>
			</div>
		</div>
	) : (
		<div className="h-screen px-[150px] py-[100px]">
			{item && (
				<div className="px-[50px] py-[50px] bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-xl rounded-xl">
					<div className="flex justify-between items-center border-b border-gray-500 px-4 py-2">
						<p className="text-xl font-semibold">{`Câu ${item.id}:`}</p>
						<FaQuestionCircle className="text-xl text-yellow-400" />
					</div>
					<div className="my-6">
						<h1 className="text-left text-2xl font-bold mb-4 mx-2">
							{item.question}
						</h1>
						<p
							className="block w-full text-left bg-gray-800 hover:bg-gray-700 p-4 rounded-md mb-4 cursor-pointer transition duration-300"
							onClick={handleClickItem}
						>
							{item.a}
						</p>
						<p
							className="block w-full text-left bg-gray-800 hover:bg-gray-700 p-4 rounded-md mb-4 cursor-pointer transition duration-300"
							onClick={handleClickItem}
						>
							{item.b}
						</p>
						<p
							className="block w-full text-left bg-gray-800 hover:bg-gray-700 p-4 rounded-md mb-4 cursor-pointer transition duration-300"
							onClick={handleClickItem}
						>
							{item.c}
						</p>
					</div>
					<div className="flex justify-between items-center border-t border-gray-500 pt-5">
						<div className="flex items-center gap-x-2">
							<FaQuestionCircle className="text-lg text-yellow-400" />
							{` ${count + 1}/${data.length}`}
						</div>
						<div className="flex flex-row gap-4">
							<Link
								to={"/learn"}
								className="bg-red-600 rounded-md px-6 py-[6px] cursor-pointer flex items-center gap-x-1 hover:scale-110 transition-transform duration-300"
							>
								<FaArrowLeft className="text-white" />
								<span>Exit</span>
							</Link>
							<button
								className={`bg-green-600 text-white rounded-md px-6 py-[6px] cursor-pointer flex items-center ${
									status
										? "hover:bg-green-700 transition duration-300"
										: "opacity-50 pointer-events-none"
								}`}
								onClick={handleNext}
							>
								Continue
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Game1;
