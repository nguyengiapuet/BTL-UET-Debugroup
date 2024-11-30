import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Should check if user is not admin, disable Dashboard section
function SidebarTreeView() {
	const [active, setActive] = useState("");
	const { setTitle } = useContext(AuthContext);

	const handleClickItem = (e) => {
		setActive(e.target.textContent.toLowerCase());
		setTitle(e.target.textContent);
	};

	const handleClickItemAdmin = (e) => {
		setActive(e.target.textContent.toLowerCase());
		setTitle(e.target.textContent + " dashboard");
	};

	return (
		<div>
			<div className="w-64 pt-3 rounded-r-lg">
				{/* Home parent */}
				<div className="pl-4 mb-4">
					<div
						className={`rounded-lg px-3 py-2 flex items-center mb-2`}
					>
						<FaHome className="text-[#9C6317] mr-4" />
						<span className="text-lg font-bold text-[#9C6317]">
							Home
						</span>
					</div>
					{/* Home childrens */}
					<div className="pl-4 relative">
						<div className="absolute top-0 h-full border-l-2 border-gray-300"></div>
						<div className="flex items-center mb-4">
							<div
								className={`w-10 border-t-2 mr-3 ${
									active === "trending"
										? "border-[#9C6317]"
										: "border-gray-300"
								}`}
							></div>
							<Link
								to={"/popular"}
								onClick={handleClickItem}
								className={`hover:bg-gray-100 hover:text-opacity-95 cursor-pointer py-1 px-2 rounded-lg w-full font-medium
									transition-all duration-200 hover:scale-[1.06] active:scale-95 active:translate-x-1 ${
										active === "trending"
											? "text-[#9C6317]"
											: "text-gray-500"
									}`}
							>
								Trending
							</Link>
						</div>
						<div className="flex items-center mb-4">
							<div
								className={`w-10 border-t-2 mr-3 ${
									active === "learn js"
										? "border-[#9C6317]"
										: "border-gray-300"
								}`}
							></div>
							<Link
								to={"/learn"}
								onClick={handleClickItem}
								className={`hover:bg-gray-100 hover:text-opacity-95 cursor-pointer py-1 px-2 rounded-lg w-full font-medium
									transition-all duration-200 hover:scale-[1.06] active:scale-95 active:translate-x-1 ${
										active === "learn js"
											? "text-[#9C6317]"
											: "text-gray-500"
									}`}
							>
								Learn JS
							</Link>
						</div>
						<div className="flex items-center mb-4">
							<div
								className={`w-10 border-t-2 mr-3 ${
									active === "about"
										? "border-[#9C6317]"
										: "border-gray-300"
								}`}
							></div>
							<Link
								to={"/about-us"}
								onClick={handleClickItem}
								className={`hover:bg-gray-100 hover:text-opacity-95 cursor-pointer py-1 px-2 rounded-lg w-full font-medium
									transition-all duration-200 hover:scale-[1.06] active:scale-95 active:translate-x-1 ${
										active === "about"
											? "text-[#9C6317]"
											: "text-gray-500"
									}`}
							>
								About
							</Link>
						</div>
						<div className="flex items-center mb-4">
							<div
								className={`w-10 border-t-2 mr-3 ${
									active === "contact us"
										? "border-[#9C6317]"
										: "border-gray-300"
								}`}
							></div>
							<span
								onClick={handleClickItem}
								className={`hover:bg-gray-100 hover:text-opacity-95 cursor-pointer py-1 px-2 rounded-lg w-full font-medium 
									transition-all duration-200 hover:scale-[1.06] active:scale-95 active:translate-x-1 ${
										active === "contact us"
											? "text-[#9C6317]"
											: "text-gray-500"
									}`}
							>
								Contact us
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="w-64 pt-3 rounded-r-lg">
				{/* Dashboard parent */}
				<div className="pl-4 mb-4">
					<div
						className={`rounded-lg px-3 py-2 flex items-center mb-2`}
					>
						<MdDashboard className="text-[#9C6317] mr-4" />
						<span className="text-lg font-bold text-[#9C6317]">
							Dashboard
						</span>
					</div>
					{/* Dashboard childrens */}
					<div className="pl-4 relative">
						<div className="absolute top-0 h-full border-l-2 border-gray-300"></div>
						<div className="flex items-center mb-4 ">
							<div
								className={`w-10 border-t-2 mr-3 ${
									active === "projects"
										? "border-[#9C6317]"
										: "border-gray-300"
								}`}
							></div>
							<Link
								to={"/admin/project-dashboard"}
								onClick={handleClickItemAdmin}
								className={`hover:bg-gray-100 hover:text-opacity-95 cursor-pointer py-1 px-2 rounded-lg w-full font-medium
									transition-all duration-200 hover:scale-[1.06] active:scale-95 active:translate-x-1 ${
										active === "projects"
											? "text-[#9C6317]"
											: "text-gray-500"
									}`}
							>
								Projects
							</Link>
						</div>
						<div className="flex items-center mb-4">
							<div
								className={`w-10 border-t-2 mr-3 ${
									active === "users"
										? "border-[#9C6317]"
										: "border-gray-300"
								}`}
							></div>
							<Link
								to={"/admin/user-dashboard"}
								onClick={handleClickItemAdmin}
								className={`hover:bg-gray-100 hover:text-opacity-95 cursor-pointer py-1 px-2 rounded-lg w-full font-medium 
									transition-all duration-200 hover:scale-[1.06] active:scale-95 active:translate-x-1 ${
										active === "users"
											? "text-[#9C6317]"
											: "text-gray-500"
									}`}
							>
								Users
							</Link>
						</div>
						<div className="flex items-center mb-4">
							<div
								className={`w-10 border-t-2 mr-3 ${
									active === "comments"
										? "border-[#9C6317]"
										: "border-gray-300"
								}`}
							></div>
							<Link
								to={"/admin/comment-dashboard"}
								onClick={handleClickItemAdmin}
								className={`hover:bg-gray-100 hover:text-opacity-95 cursor-pointer py-1 px-2 rounded-lg w-full font-medium 
									transition-all duration-200 hover:scale-[1.06] active:scale-95 active:translate-x-1 ${
										active === "comments"
											? "text-[#9C6317]"
											: "text-gray-500"
									}`}
							>
								Comments
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SidebarTreeView;
