/* eslint-disable jsx-a11y/iframe-has-title */
import { useContext, useEffect, useRef, useState } from "react";
import SplitPane from "react-split-pane";
import logo from "../asset/Logo.png";
import {
	FaChevronDown,
	FaCog,
	FaCss3,
	FaEdit,
	FaHtml5,
	FaJs,
	FaSave,
	FaShare,
	FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import SummaryApi from "../common";
import { toast } from "react-toastify";

function Pen() {
	const ref = useRef();
	const ed = useRef();
	const params = useParams();

	const navigate = useNavigate();

	console.log("params.id", params.id);

	const [dataPen, setDataPen] = useState({
		html: "",
		css: "",
		js: "",
		title: "Untitled",
		output: "",
		email: "",
	});

	const [editTitle, seteditTitle] = useState(true);

	const { userData } = useContext(AuthContext);

	const editCode = () => {
		const content = `
            <html><head><style>${dataPen.css}</style></head><body>${dataPen.html}<script>${dataPen.js}</script></body></html>
            `;
		setDataPen({
			...dataPen,
			output: content,
		});
	};

	const handleOnchanePen = (e) => {
		setDataPen({ ...dataPen, [e.target.name]: e.target.value });
	};

	const handleEdit = () => {
		ref.current.disabled = false;
		ref.current.value = "";
		ref.current.focus();
		seteditTitle(false);
	};

	const handleKey = (e) => {
		if (e.key === "Enter") {
			ref.current.disabled = true;
			seteditTitle(true);
		}
	};

	const handleBlur = () => {
		ref.current.disabled = true;
		seteditTitle(true);
	};

	const handleCreatPens = async () => {
		try {
			const response = await axios.post(SummaryApi.createPens.url, {
				title: dataPen.title,
				html: dataPen.html,
				css: dataPen.css,
				js: dataPen.js,
				output: dataPen.output,
			});

			if (response.data.success) {
				toast.success(response.data.message);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleSavePens = async () => {
		try {
			if (params.id === undefined) {
				await handleCreatPens();
			} else {
				const response = await axios.put(
					`${SummaryApi.updatePens.url}/${params.id}`,
					{
						title: dataPen.title,
						html: dataPen.html,
						css: dataPen.css,
						js: dataPen.js,
						output: dataPen.output,
					}
				);

				if (response.data.success) {
					toast.success(response.data.message);
				}
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleLoadPens = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.getPens.url}/${params.id}`
			);
			if (response.data.success) {
				console.log("response.data.data", response.data.data);

				// setTitle(response.data.data.title);
				setDataPen(response.data.data);

				console.log("response.data.message", response.data.message);
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

	useEffect(() => {
		editCode();
	}, [dataPen.html, dataPen.css, dataPen.js]);

	return (
		<div className="w-[calc(100wh-20px)] max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] flex flex-col">
			<div className="h-[64px] bg-[#1D1C1C] flex items-center justify-between">
				<div className="h-[64px] flex items-center">
					<Link to={"/"} className="h-full w-24 ">
						<img src={logo} alt="" className="h-full w-full px-1" />
					</Link>
					<div className="">
						<div className="flex items-center">
							<input
								size={dataPen.title.length || 1}
								ref={ref}
								onBlur={handleBlur}
								onKeyDown={handleKey}
								value={dataPen.title}
								name="title"
								type="text"
								className="text-white text-xl font-medium bg-transparent outline-none"
								disabled
								onChange={handleOnchanePen}
							/>
							{editTitle && (
								<FaEdit
									ref={ed}
									className="text-white -ml-6 text-sm block cursor-pointer hover:text-green-300"
									onClick={handleEdit}
								/>
							)}
						</div>
						<h3 className="text-xs text-slate-400 font-normal">
							title
						</h3>
					</div>
				</div>

				<div className="flex gap-2 px-2">
					<Link
						to={"/"}
						onClick={handleSavePens}
						className="flex gap-1 items-center bg-[#9C6317] px-4 py-2 rounded text-white hover:bg-opacity-75"
					>
						<FaShare />
						<button>Share</button>
					</Link>
					{(!params.id || dataPen.email === userData.email) && (
						<Link
							to={"/"}
							onClick={handleSavePens}
							className="flex gap-1 items-center bg-[#9C6317] px-4 py-2 rounded text-white hover:bg-opacity-75"
						>
							<FaSave />
							<button>Save</button>
						</Link>
					)}
					{userData.id ? (
						<div className="flex gap-2 items-center">
							<p className="text-lg text-white font-semibold">
								{userData.username}
							</p>
							{userData.avatar ? (
								<img
									alt=""
									src={userData.avatar}
									className="w-12 h-12 rounded-full border border-gray-400"
								/>
							) : (
								<FaUserCircle className="w-12 h-12 rounded-full" />
							)}
						</div>
					) : (
						<>
							<div className="flex items-center bg-[#9C6317] px-4 py-2 rounded text-white hover:bg-opacity-75">
								<Link to={"/signup"}>Sign Up</Link>
							</div>

							<div className="flex items-center bg-slate-500 px-4 py-2 rounded text-white hover:bg-opacity-75">
								<Link to={"/login"}>Log In</Link>
							</div>
						</>
					)}
				</div>
			</div>
			<div>
				<SplitPane
					split="horizontal"
					minSize={100}
					maxSize={-100}
					defaultSize={"50%"}
				>
					<SplitPane
						split="vertical"
						minSize={100}
						maxSize={-100}
						defaultSize={"30%"}
					>
						{/* Html */}
						<div className="h-full w-full relative p-1 bg-[#e5e7eb] pt-0 pl-0 pb-2">
							<div className="flex bg-white absolute w-full justify-between">
								<div className="flex items-center px-2 bg-slate-300 gap-1 ">
									<FaHtml5 className="text-xl text-red-600" />
									<p className="text-lg font-medium ">HTML</p>
								</div>
								<div className="flex gap-2 items-center px-2">
									<FaCog className="text-base" />
									<FaChevronDown className="text-base" />
								</div>
							</div>
							<textarea
								value={dataPen.html}
								onChange={handleOnchanePen}
								name="html"
								className="px-2 py-8 w-full h-full bg-black text-white outline-none overflow-y-scroll resize-none scroll-c"
							></textarea>
						</div>

						<SplitPane
							split="vertical"
							minSize={100}
							maxSize={-100}
							defaultSize={"50%"}
						>
							{/* CSS */}
							<div className="h-full w-full relative p-1 pt-0 bg-[#e5e7eb] pb-2">
								<div className="flex justify-between bg-white absolute w-full">
									<div className="flex items-center px-2 bg-slate-300 gap-1">
										<FaCss3 className="text-xl text-blue-600" />
										<p className="text-lg font-medium ">
											CSS
										</p>
									</div>
									<div className="flex gap-2 items-center px-2">
										<FaCog className="text-base" />
										<FaChevronDown className="text-base" />
									</div>
								</div>
								<textarea
									value={dataPen.css}
									name="css"
									onChange={handleOnchanePen}
									className="px-2 py-8 w-full h-full bg-black text-white outline-none overflow-y-scroll resize-none scroll-c"
								></textarea>
							</div>

							{/* JS */}
							<div className="h-full w-full relative p-1 bg-[#e5e7eb] pt-0 pr-0 pb-2">
								<div className="flex justify-between bg-white absolute w-full">
									<div className="flex items-center px-2 bg-slate-300 gap-1">
										<FaJs className="text-xl text-yellow-500" />
										<p className="text-lg font-medium ">
											JS
										</p>
									</div>
									<div className="flex gap-2 items-center px-2">
										<FaCog className="text-base" />
										<FaChevronDown className="text-base" />
									</div>
								</div>
								<textarea
									value={dataPen.js}
									name="js"
									onChange={handleOnchanePen}
									className="px-2 py-8 w-full h-full bg-black text-white outline-none overflow-y-scrollscroll resize-none scroll-c"
								></textarea>
							</div>
						</SplitPane>
					</SplitPane>

					<div className="w-full h-full bg-black border-2 border-black">
						<iframe
							srcDoc={dataPen.output}
							className="text-white w-full min-h-full"
						/>
					</div>
				</SplitPane>
			</div>
		</div>
	);
}

export default Pen;
