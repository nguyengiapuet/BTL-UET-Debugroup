import { FaJs, FaQuestion } from "react-icons/fa";
import CodeMirror from "@uiw/react-codemirror";
import EditorPane from "../../user_project/pen_components/EditorPane";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../../../common";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Modal, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { MdDone } from "react-icons/md";

function Exercise({ dataPen, handleOnChangePen, javascript, setDataPen }) {
	let result = "";
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [item, setItem] = useState(null);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isCorrectModal, setIsCorrectModal] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const showCorrectModal = () => {
		setIsCorrectModal(true);
	};

	const handleCancelCorrectModal = () => {
		setIsCorrectModal(false);
	};

	const handleSubmit = () => {
		console.log(result);
		if (result === item.result) {
			showCorrectModal();
		} else {
			showModal();
		}
	};
	const handlePre = () => {
		setShowAnswer(false);
		if (count > 0) {
			setCount(count - 1);
		}
	};
	const handleNext = () => {
		handleCancelCorrectModal();
		setShowAnswer(false);
		if (count < 4) {
			setCount(count + 1);
		} else navigate("/learn");
	};
	useEffect(() => {
		const question = async () => {
			try {
				const response = await axios.get(
					`${SummaryApi.getQuestion2.url}`
				);
				const remp = await response.data;
				if (response.data.success) {
					setData(remp.data);
					setItem(response.data.data[count]);
				} else {
					console.log("response.data.message", response.data.message);
				}
			} catch (err) {
				console.log(err.message);
			}
		};
		question();
	}, [count]);

	useEffect(() => {
		setDataPen({
			...(dataPen || {}),
			js: (item?.placeholder || "").replace(/\\n/g, "\n"),
		});
	}, [item?.placeholder, setDataPen]);
	const handleClickAnswer = () => {
		setIsModalVisible(false);
		setIsCorrectModal(false);
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

	return (
		<div className="bg-[#15222e] flex flex-col overflow-y-auto min-h-[calc(100vh-56px)]">
			<div className="flex h-[400px]">
				<div className="w-[750px] bg-[#15222e] border-2 border-black ">
					<div className="text-sm py-1 px-3 font-medium text-white  bg-gray-600 flex items-center gap-x-1">
						(<FaQuestion />) Question {count + 1}/{data.length}:
					</div>
					{data.length === 0 ? (
						<h1 className="text-white mt-3 leading-6 p-3">
							<div
								dangerouslySetInnerHTML={{
									__html: "loading",
								}}
							/>
						</h1>
					) : (
						<h1 className="text-white mt-3 leading-6 p-3">
							<div
								dangerouslySetInnerHTML={{
									__html: item?.question || "",
								}}
							/>
						</h1>
					)}
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
			<div className="flex grow">
				<div className="w-full bg-[#15222e] border-2 border-black overflow-auto flex flex-col">
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

				<div className="w-[600px] bg-[#15222e] border-2 border-black ">
					<div className="text-sm py-1 px-3 font-medium text-white  bg-gray-600 flex justify-between items-center gap-x-1">
						Hint
						{showAnswer && (
							<span
								className="border border-[1px] border-gray-500 rounded px-3 bg-sky-500 cursor-pointer hover:bg-sky-600"
								onClick={getAnswer}
							>
								Apply code
							</span>
						)}
					</div>
					<CodeMirror
						value={showAnswer ? item.answer : "No available"}
						theme={dracula}
						extensions={javascript()}
						style={{
							backgroundColor: "#282a36",
							overflow: "auto",
						}}
						editable={false}
						options={{
							readOnly: true,
						}}
						maxHeight="242px"
					/>
				</div>
			</div>
			<div className="h-[45px] flex flex-row items-center justify-center gap-3 w-full bg-[#15222e] border-[1px] border-black text-white items-center">
				<button
					className="uppercase px-3 py-[2px] border-[#2a3947] border-[1px] text-[#526173] rounded bg-[#1d2b39] hover:bg-red-400 hover:text-white"
					onClick={handlePre}
				>
					Exit
				</button>
				<button
					className="uppercase px-3 py-[2px] bg-[#58a51b] rounded text-white hover:bg-[#58a51b]/80"
					onClick={handleSubmit}
				>
					Submit
				</button>
				<button
					className="uppercase px-3 py-[2px] bg-red-500 rounded text-white hover:bg-red-600"
					onClick={showReset}
				>
					Reset
				</button>
				<button
					className="uppercase px-3 py-[2px] border-[#2a3947] border-[1px] text-[#526173] rounded bg-[#1d2b39] hover:bg-red-400 hover:text-white"
					onClick={handleNext}
				>
					Next
				</button>
			</div>
			<Modal
				open={isModalVisible}
				onCancel={handleCancel}
				footer={[
					<Button key="cancel" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button
						key="showAnswers"
						type="primary"
						onClick={handleClickAnswer}
					>
						Show Answers
					</Button>,
				]}
				bodyStyle={{ textAlign: "center", padding: "40px" }}
			>
				<CloseCircleOutlined
					style={{
						fontSize: "64px",
						color: "#ff4d4f",
						marginBottom: "16px",
					}}
				/>
				<h2
					style={{
						color: "#ff4d4f",
						marginBottom: "16px",
						fontSize: "16px",
						fontWeight: "bold",
					}}
				>
					Answer is Wrong
				</h2>
				<p style={{ fontSize: "16px", color: "#595959" }}>
					Please try again or review the correct answers.
				</p>
			</Modal>
			<Modal
				open={isCorrectModal}
				onCancel={handleCancelCorrectModal}
				footer={[
					<Button key="showAnswers" onClick={handleClickAnswer}>
						Show our Answers
					</Button>,
					<Button
						type="primary"
						onClick={() => {
							setIsModalVisible(false);
							handleNext();
						}}
					>
						Next question
					</Button>,
				]}
				bodyStyle={{
					textAlign: "center",
					padding: "40px",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<MdDone
					style={{
						fontSize: "64px",
						color: "#58a51b",
						marginBottom: "16px",
					}}
				/>
				<h2
					style={{
						color: "#58a51b",
						marginBottom: "16px",
						fontSize: "16px",
						fontWeight: "bold",
					}}
				>
					Answer is Correct
				</h2>
				<p style={{ fontSize: "16px", color: "#595959" }}>
					Try next challenges or view the correct answers.
				</p>
			</Modal>
		</div>
	);
}

export default Exercise;
