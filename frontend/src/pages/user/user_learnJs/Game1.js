import axios from "axios";
import SummaryApi from "../../../common";
import { useEffect, useState } from "react";

const Game1 = () => {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [answer, setAnswer] = useState([]);
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
	return (
		<div className="px-[300px] py-[100px] bg-purple-400 ">
			{item && (
				<div className="px-[50px] py-[50px] bg-slate-600 shadow-2xl rounded-xl">
					<div className="flex justify-between items-center border-b border-black px-4 py-2">
						<p className="text-xl font-semibold">{`Câu ${item.id}:`}</p>
						<div className="flex items-center bg-primary text-black rounded-md px-3 py-1">
							<span class="mr-2">Timer:</span>
							<span
								id="t"
								class="bg-white text-black rounded px-2 py-1"
							>
								15
							</span>
						</div>
					</div>
					<div className="">
						<h1 className="text-left text-xl font-bold my-4 mx-2">
							{item.question}
						</h1>
						<p className="block w-full text-left bg-gray-200 hover:bg-gray-300 p-4 rounded-md mb-4 cursor-pointer ">
							{item.a}
						</p>
						<p className="block w-full text-left bg-gray-200 hover:bg-gray-300 p-4 rounded-md mb-4 cursor-pointer">
							{item.b}
						</p>
						<p className="block w-full text-left bg-gray-200 hover:bg-gray-300 p-4 rounded-md mb-4 cursor-pointer">
							{item.c}
						</p>
					</div>
					<div className="flex justify-between items-center border-t border-black px-4 py-2">
						<div className="flex">{`Q ${count + 1}/${
							data.length
						}`}</div>
						<div className="flex justify-end gap-x-2">
							<p
								class={`bg-red-500 text-white rounded-md px-4 py-2 cursor-pointer  ${
									count < 1
										? "opacity-50 cursor-not-allowed"
										: ""
								}`}
								onClick={() => {
									if (count > 0) setCount(count - 1);
									else setCount(0);
								}}
							>
								Previous
							</p>
							<p
								class={`bg-red-500 text-white rounded-md px-4 py-2 cursor-pointer ${
									count >= data.length - 1
										? "opacity-50 cursor-not-allowed"
										: ""
								}`}
								onClick={() => {
									if (count < data.length - 1)
										setCount(count + 1);
									else setCount(data.length - 1);
								}}
							>
								Next
							</p>
						</div>
						<button
							class="bg-gray-300 text-gray-500 cursor-pointer rounded-md px-4 py-2"
							onClick={(e) => console.log(e)}
						>
							Submit
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
export default Game1;
