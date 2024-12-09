import { FaSearch } from "react-icons/fa";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";
import jsLogo from "../../asset/image.png";
import { useState } from "react";
import SidebarTreeView from "./LayerTree";
import { AiFillGithub } from "react-icons/ai";
import ListFollower from "../followers/ListFollower";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import Search from "./Search";

// Left Sidebar Page
function Sidebar({ isSidebarOpen }) {
	const [activeButton, setActiveButton] = useState("Category");
	const [isFocused, setIsFocused] = useState(false);

	// Implement modal for rating Web.
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	// Add state for rating
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setOpen(false);
		}, 3000);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleStarClick = (star) => {
		if (rating === star) {
			setRating(0);
		} else {
			setRating(star);
		}
	};

	return (
		<div>
			{isSidebarOpen && (
				<div className="overflow-hidden coding-box bg-[#ffffff] w-[300px] min-h-screen max-h-screen flex flex-col items-center gap-7 px-6 py-5">
					{/* Main logo app */}
					<div className=" w-full h-11 flex items-center justify-center">
						<img src={jsLogo} />
					</div>
					{/* Social button link */}
					<div className="flex flex-row items-center justify-center gap-3">
						<Link
							className="hover:bg-gray-200 flex flex-row items-center gap-1 border-[1px] border-[#D9D9D9] rounded-md px-3 py-1 text-sm"
							to={
								"https://github.com/nguyengiapuet/BTL-UET-Debugroup.git"
							}
							target="blank"
						>
							<AiFillGithub />
							Code
						</Link>
						<button
							className="hover:bg-gray-200 flex flex-row items-center gap-1 border-[1px] border-[#D9D9D9] rounded-md px-3 py-1 text-sm"
							onClick={showModal}
						>
							<AiFillStar className="text-yellow-400" />
							Rate
						</button>
					</div>

					<div className="relative bg-[#EDEDED] rounded-full w-full flex py-[5px] items-center justify-between">
						{/* Slider background */}
						<div
							className={`absolute top-[4px] bottom-[4px] left-[3px] right-[3px] w-[calc(50%-6px)] bg-white rounded-full shadow-xl transition-transform duration-300 ${
								activeButton === "Following"
									? "translate-x-full"
									: "translate-x-[3px]"
							}`}
						></div>

						{/* Category Button */}
						<button
							className={`relative z-10 px-4 py-2 left-[3px] flex items-center justify-start gap-1 text-sm font-bold rounded-full ${
								activeButton === "Category"
									? "text-gray-700"
									: "text-gray-500"
							}`}
							onClick={() => setActiveButton("Category")}
						>
							<AiFillAppstore
								className={`${
									activeButton === "Category"
										? "text-[#9C6317]"
										: "text-[#6262629e]"
								}`}
							/>
							Category
						</button>

						{/* Following Button */}
						<button
							className={`relative z-10 px-4 py-2 right-[3px] flex items-center justify-center gap-1 text-sm font-bold rounded-full ${
								activeButton === "Following"
									? "text-gray-700"
									: "text-gray-500"
							}`}
							onClick={() => setActiveButton("Following")}
						>
							<AiFillStar
								className={`${
									activeButton === "Following"
										? "text-[#9C6317]"
										: "text-[#6262629e]"
								}`}
							/>
							Following
						</button>
					</div>

					{/* Search button */}
					{/* <div
						className={`w-full border-2 rounded-3xl flex items-center px-4 transition-colors duration-300 ${
							isFocused
								? "border-[#D68E2F] boder-1"
								: "border-[#D9D9D9]"
						}`}
					>
						<FaSearch
							className={`${
								isFocused ? "text-sky-600" : "text-[#D9D9D9]"
							}`}
						/>
						<input
							type="text"
							placeholder="Enter your text"
							className="w-full rounded-full font-normal text-sm py-2 px-2 outline-none"
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
						/>
					</div> */}
					<Search isFocused={isFocused} setIsFocused={setIsFocused} />

					{/* Layer tree view */}
					<div className="flex grow">
						{activeButton === "Category" ? (
							<SidebarTreeView />
						) : (
							<ListFollower />
						)}
					</div>
				</div>
			)}

			<Modal
				open={open}
				title={
					<div className="text-lg font-bold h-10 border-b-[1px] border-[#D9D9D9]">
						Feedback
					</div>
				}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={
					<Button
						key="submit"
						type="primary"
						loading={loading}
						onClick={handleOk}
						className="w-full min-h-10 bg-[#9C6317] text-white mt-5"
					>
						Submit
					</Button>
				}
			>
				<div className=" py-6 flex flex-col items-center gap-2">
					<div className="text-2xl font-bold text-center">
						How are you feeling?
					</div>
					<div className="text-center text-sm">
						Your input is valuable in helping us better understand
						your needs and tailor our service accordingly
					</div>
				</div>
				<div className="flex flex-row justify-between items-center px-10 pb-10">
					{[1, 2, 3, 4, 5].map((star) => (
						<AiFillStar
							key={star}
							className={`size-12 cursor-pointer ${
								star <= (hover || rating)
									? "text-yellow-400"
									: "text-gray-300"
							}`}
							onClick={() => handleStarClick(star)}
							onMouseEnter={() => setHover(star)}
							onMouseLeave={() => setHover(rating)}
							onDoubleClick={() => setRating(0)}
							title={
								rating === star
									? "Click again to cancel"
									: "Click to rate"
							}
						/>
					))}
				</div>
				<textarea
					className="w-full min-h-20 border-2 rounded-md p-2"
					placeholder="Add a comment"
				></textarea>
			</Modal>
		</div>
	);
}

export default Sidebar;
