import { FaChevronDown, FaEdit, FaSave, FaShare } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { AiFillCode } from "react-icons/ai";
import { UserAvatar, UserPopup } from "../../../../components/layout/Header";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext, useState } from "react";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../../../common/constants";

function ProjectHeader({
	editTitle,
	handleEdit,
	handleBlur,
	handleKey,
	handleSavePens,
	handleOnchanePen,
	userData,
	inputRef,
	dataPen,
}) {
	const params = useParams();

	return (
		<div className="h-[60px] bg-[#15222e] flex items-center justify-between border-b border-gray-400">
			<div className="h-[60px] flex items-center gap-3 flex-row pl-2 ">
				<AiFillCode className="text-[#9C6317] text-4xl" />
				<div>
					<div className="flex items-center gap-3">
						<input
							style={{ width: `${dataPen.title.length}ch` }}
							ref={inputRef}
							onBlur={handleBlur}
							onKeyDown={handleKey}
							value={dataPen.title}
							name="title"
							type="text"
							className="text-white text-md font-medium bg-transparent outline-none"
							onChange={(e) =>
								handleOnchanePen(e.target.value, e.target.name)
							}
						/>
						{editTitle && (
							<FaEdit
								className="text-white text-md block cursor-pointer hover:text-green-300"
								onClick={handleEdit}
							/>
						)}
					</div>
					<h3 className="text-xs text-slate-400 font-normal">
						Anonymous
					</h3>
				</div>
			</div>

			<div className="flex gap-6 flex-row pr-2">
				<div className="flex flex-row gap-3 justify-center items-center">
					<Link
						to="/"
						className="max-h-[30px] text-sm flex gap-1 items-center bg-[#9C6317] px-4 py-[3px] rounded text-white hover:bg-opacity-75"
					>
						<FaShare className="text-sm" />
						<button>Share</button>
					</Link>
					{(!params.id || dataPen.email === userData.email) && (
						<Link
							to="/"
							onClick={handleSavePens}
							className="text-sm flex gap-1 items-center bg-[#9C6317] px-4 py-[3px] rounded text-white hover:bg-opacity-75"
						>
							<FaSave />
							<button>Save</button>
						</Link>
					)}
				</div>
				<div className="py-[3px] w-[1px] bg-white"></div>
				<UserSection />
			</div>
		</div>
	);
}

const UserSection = () => {
	// Change ui if user is logged in
	// TODO

	const { userData, setUserData, setTitle } = useContext(AuthContext);
	const [openPop, setOpenPop] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isPasswordOpen, setIsPasswordOpen] = useState(false);
	// const handleClosePassword = () => {
	// 	setIsPasswordOpen(false);
	// };
	// const handleCloseProfile = () => {
	// 	setIsProfileOpen(false);
	// };

	const handleLogout = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		setUserData({
			id: "",
			username: "",
			email: "",
			password: "",
			role: "",
			avatar: "",
		});
	};
	// else
	return (
		<>
			{userData?.id ? (
				<div
					className="flex flex-row gap-6 items-center justify-center"
					onClick={() => setOpenPop(!openPop)}
					onBlur={() => setOpenPop(false)}
				>
					<div className="h-full min-w-[250px] flex flex-row items-center justify-start gap-3 relative">
						<UserAvatar avatar={userData.avatar} size="size-10" />
						<div className="text-sm font-medium flex text-white flex-row justify-center items-center gap-1 cursor-pointer">
							<span className="font-medium ">Xin chào,</span>
							<span className="font-bold">
								{userData.username}
							</span>
							<FaChevronDown
								className={`ml-1 text-gray-500 transition-transform duration-300 ${
									openPop ? "rotate-180" : ""
								}`}
							/>
						</div>
						{openPop && (
							<UserPopup
								userData={userData}
								setOpenPop={setOpenPop}
								setTitle={setTitle}
								setIsProfileOpen={setIsProfileOpen}
								setIsPasswordOpen={setIsPasswordOpen}
								handleLogout={handleLogout}
							/>
						)}
					</div>
				</div>
			) : (
				<div className="flex flex-row gap-3">
					<div className="flex items-center border-[1px] border-slate-500 bg-white px-4 py-[3px] text-sm rounded text-black hover:bg-opacity-75">
						<Link to="/signup">Signup</Link>
					</div>
					<div className="flex items-center border-[1px] border-[#D9D9D9] bg-slate-500 px-4 py-[3px] text-sm rounded text-white hover:bg-opacity-75">
						<Link to="/login">Login</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default ProjectHeader;
