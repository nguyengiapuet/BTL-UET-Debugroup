import {
	FaJs,
	FaQuestion,
	FaArrowLeft,
	FaCheck,
	FaExclamationCircle,
	FaPen,
} from "react-icons/fa";
import CodeMirror from "@uiw/react-codemirror";
import EditorPane from "../../user_project/pen_components/EditorPane";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../../../common";
import { dracula } from "@uiw/codemirror-theme-dracula";

function Exercise({ dataPen, handleOnChangePen, javascript, setDataPen }) {
	let result = "";
	const navigate = useNavigate();
	const [status, setStatus] = useState("hidden");
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const handleSubmit = () => {
		console.log(result);
		if (result === item.result) {
			setStatus("correct");
		} else {
			setStatus("incorrect");
		}
	};
	const handlePre = () => {
		if (count > 0) {
			setCount(count - 1);
			setStatus("hidden");
		}
	};
	const handleNext = () => {
		if (count < 4) {
			setCount(count + 1);
			setStatus("hidden");
		} else navigate("/learn");
	};
	useEffect(() => {
		const question = async () => {
			try {
				const response = await axios.get(
					`${SummaryApi.getQuestion2.url}`
				);
				const remp = await response.data;
				console.log("test data", remp);
				if (response.data.success) {
					setData(remp.data);
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
	useEffect(() => {
		setDataPen({
			...(dataPen || {}),
			js: (item?.placeholder || "").replace(/\\n/g, "\n"),
		});
	}, [item?.placeholder, setDataPen]);
	const handleClickAnswer = () => {
		setShowAnswer(true);
	};
	const getAnswer = () => {
		setDataPen({
			...(dataPen || {}),
			js: item.answer,
		});
		setShowAnswer(false);
	};

	const showReset = () => {
		setDataPen({
			...(dataPen || {}),
			js: item.placeholder,
		});
		setShowAnswer(false);
	};

	return showAnswer ? (
		<div
			className="fixed inset-0 z-20 flex items-center justify-center bg-gray-900/65 "
			onClick={() => setShowAnswer(false)}
		>
			<div
				className="h-[500px] w-[700px] bg-[#282a36] overflow-y-auto relative"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="h-full w-full relative bg-[#e5e7eb] pt-0">
					<h1 className="fixed  text-[#39e326] ml-[300px] mt-2">
						Xem đáp án
					</h1>
					<CodeMirror
						value={item.answer}
						height="100%"
						theme={dracula}
						extensions={javascript()}
						style={{
							backgroundColor: "#282a36",
						}}
						editable={false}
						options={{
							readOnly: true,
						}}
						className="py-8 h-full"
					/>
					<p
						className="fixed bottom-[150px] right-[450px] px-3 py-2 bg-slate-300 rounded-xl hover:scale-105 hover:bg-slate-600 cursor-pointer"
						onClick={getAnswer}
					>
						Get code from answer
					</p>
				</div>
			</div>
		</div>
	) : (
		<div className="">
			<div className="flex h-[400px]">
				<div className="w-[750px] bg-[#15222e] border-2 border-black ">
					<div className="text-sm py-1 px-3 font-medium text-white  bg-gray-600 flex items-center gap-x-1">
						Question {count + 1}
						<FaQuestion />
					</div>
					<h1 className="text-white mt-3 leading-6 p-3">
						<div
							dangerouslySetInnerHTML={{
								__html: item?.question2 || "",
							}}
						/>
					</h1>
				</div>
				<EditorPane
					icon={FaJs}
					title="JS"
					language="JS"
					value={dataPen.js}
					onChange={handleOnChangePen}
					extension={javascript}
				/>
			</div>
			<div className="flex h-[400px]">
				<div className="w-[750px] bg-[#15222e] border-2 border-black overflow-auto flex flex-col">
					<div className="flex justify-between bg-gray-400 w-full">
						<div className="text-sm py-1 px-3 font-medium text-white bg-[#15222e]">
							Console
						</div>
					</div>
					<div className="text-white font-mono whitespace-pre p-4">
						{(() => {
							const logs = [];
							const originalConsole = window.console;
							window.console = {
								log: (...args) => {
									logs.push(`=> ${args.join(" ")}`);
									originalConsole.log(...args);
								},
								error: (...args) => {
									logs.push(`Error: ${args.join(" ")}`);
									originalConsole.error(...args);
								},
							};

							try {
								eval(dataPen.js);
							} catch (err) {
								logs.push(`Error: ${err.message}`);
							}
							window.console = originalConsole;
							result = logs
								.map((item) => item.replace("=> ", ""))
								.join(" ");
							return logs.join("\n");
						})()}
					</div>
				</div>
				<p
					className="absolute right-32 top-16 group"
					onClick={showReset}
				>
					<FaPen className="cursor-pointer" />
					<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						Reset
					</span>
				</p>

				<div className="w-[500px] bg-[#15222e] border-2 border-black ">
					<div className="text-sm py-1 px-3 font-medium text-white  bg-gray-600 flex items-center gap-x-1">
						Submit
						<FaQuestion />
					</div>
					<div className="flex items-center mt-5 justify-evenly">
						<p
							className="bg-red-500 rounded-md px-4 py-2 cursor-pointer flex items-center gap-x-1 hover:scale-110"
							onClick={handlePre}
						>
							<FaArrowLeft /> <span>Exit</span>
						</p>
						<p
							className="px-4 py-2 bg-green-700 rounded-xl  cursor-pointer hover:scale-110"
							onClick={handleNext}
						>
							Continue
						</p>
						<p
							className="px-4 py-2 bg-slate-500 rounded-xl  cursor-pointer hover:scale-110"
							onClick={handleClickAnswer}
						>
							Answer
						</p>
						<p
							className="px-4 py-2 bg-[#2150de] rounded-xl  cursor-pointer hover:scale-110"
							onClick={handleSubmit}
						>
							Submit
						</p>
					</div>

					<p
						className={`text-[#3225f0] text-[25px] mt-8 ml-36 flex items-center gap-x-3 ${
							status === "correct" ? "" : "hidden"
						}`}
					>
						<FaCheck /> Đáp án chính xác
					</p>
					<p
						className={`text-red-800 text-[25px] mt-8 ml-32 flex items-center gap-x-3 ${
							status === "incorrect" ? "" : "hidden"
						}`}
					>
						<FaExclamationCircle /> Đáp án chưa chính xác
					</p>
				</div>
			</div>
		</div>
	);
}

export default Exercise;
