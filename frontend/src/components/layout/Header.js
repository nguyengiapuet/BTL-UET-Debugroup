import { Link } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../common/constants";
import {
	FaLock,
	FaRegBell,
	FaSignOutAlt,
	FaUser,
	FaUserCircle,
	FaChevronDown,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineMenu } from "react-icons/ai";
import Search from "../search/Search";
import ProfileModal from "../../pages/user/user_account/Profile";
import ChangePasswordModal from "../../pages/user/user_account/ChangePassword";

function Header({ toggleNav }) {
	const { userData, setUserData, title, setTitle } = useContext(AuthContext);
	const [openPop, setOpenPop] = useState(false);

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

	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const handleCloseProfile = () => {
		setIsProfileOpen(false);
	};
	const [isPasswordOpen, setIsPasswordOpen] = useState(false);
	const handleClosePassword = () => {
		setIsPasswordOpen(false);
	};
	return (
		<div className="w-full bg-[#f4f8ff] shadow-md py-2 flex flex-row justify-between items-center">
			<MenuSection title={title} toggleNav={toggleNav} />
			<Search />
			<AuthSection
				userData={userData}
				openPop={openPop}
				setOpenPop={setOpenPop}
				setTitle={setTitle}
				handleLogout={handleLogout}
				setIsProfileOpen={setIsProfileOpen}
				setIsPasswordOpen={setIsPasswordOpen}
			/>
			<ProfileModal isOpen={isProfileOpen} onClose={handleCloseProfile} />
			<ChangePasswordModal
				isOpen={isPasswordOpen}
				onClose={handleClosePassword}
			/>
		</div>
	);
}

export const MenuSection = ({ title, toggleNav }) => (
	<div className="h-6 hidden md:flex items-center gap-2 min-w-[200px] w-fit">
		<button
			onClick={toggleNav}
			className="p-3 text-xl text-white rounded-md hover:bg-gray-200 focus:outline-none transition duration-300"
		>
			<AiOutlineMenu className="text-gray-700 text-lg font-bold" />
		</button>
		<p className="text-lg font-bold text-[#545454]">{title}</p>
	</div>
);

export const UserAvatar = ({ avatar, size = "size-10" }) =>
	avatar ? (
		<img
			src={avatar}
			alt="avatar"
			className={`cursor-pointer ${size} rounded-full border-[#9C6317] border-2`}
		/>
	) : (
		<FaUserCircle className={`cursor-pointer rounded-full ${size}`} />
	);

export const PopupMenuItem = ({ to, onClick, icon: Icon, children }) => (
	<div
		onClick={onClick}
		className="text-sm flex gap-2 items-center text-[#454545] bg-white px-1 py-2 cursor-pointer 
			transition-all duration-200 ease-in-out
			hover:bg-[#9C6317]/10 hover:text-[#9C6317] hover:pl-3
			group font-medium border-b-2"
	>
		<Icon className="size-3 transition-colors duration-200 group-hover:text-[#9C6317]" />
		{children}
	</div>
);

export const UserPopup = ({
	userData,
	setOpenPop,
	setTitle,
	setIsProfileOpen,
	setIsPasswordOpen,
}) => (
	<div
		className="z-[999] absolute flex flex-col w-[250px] px-4 py-1 bg-white h-fit rounded-md top-8 -left-3
		transform transition-all duration-200 origin-top opacity-100 scale-100 translate-y-0"
	>
		<div className="flex flex-row justify-end items-center gap-3 py-2">
			<div className="text-sm font-medium flex flex-col items-end gap-1">
				<div className="text-md font-bold">{userData.username}</div>
				<div className="text-sm font-medium">{userData.email}</div>
			</div>
			<UserAvatar avatar={userData.avatar} size="size-10" />
		</div>

		<PopupMenuItem
			onClick={() => {
				setTitle("Quản lý tài khoản");
				setOpenPop(false);
				setIsProfileOpen(true);
			}}
			icon={FaUser}
		>
			Thông tin cá nhân
		</PopupMenuItem>

		<PopupMenuItem
			onClick={() => {
				setTitle("Quản lý tài khoản");
				setOpenPop(false);
				setIsPasswordOpen(true);
			}}
			icon={FaLock}
		>
			Đổi mật khẩu
		</PopupMenuItem>

		<PopupMenuItem
			onClick={() => {
				setTitle("Quản lý tài khoản");
				setOpenPop(false);
			}}
			icon={FaSignOutAlt}
		>
			Đăng Xuất
		</PopupMenuItem>
	</div>
);

const AuthSection = ({
	userData,
	openPop,
	setOpenPop,
	setTitle,
	setIsProfileOpen,
	setIsPasswordOpen,
}) => (
	<div className="flex flex-row items-center justify-center">
		{userData.id ? (
			<div className="flex flex-row gap-6 items-center justify-center">
				<FaRegBell className="text-lg font-bold text-[#9C6317]" />
				<div className="h-6 w-[2px] bg-gray-400" />
				{/* <<<<<<< HEAD
				<div className="h-full min-w-[250px] flex flex-row items-center justify-start gap-3 relative">
					<UserAvatar avatar={userData.avatar} size="size-10" />
======= */}
				<div
					className="h-full min-w-[250px] flex flex-row items-center justify-start gap-3 relative"
					onClick={() => setOpenPop(!openPop)}
					onBlur={() => setOpenPop(false)}
				>
					<UserAvatar avatar={userData.avatar} size="size-10" />
					<div className="text-sm font-medium flex flex-row justify-center items-center gap-1 cursor-pointer">
						<span className="font-medium">Xin chào,</span>
						<span className="font-bold">{userData.username}</span>
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
							setIsPasswordOpen={setIsPasswordOpen}
							setIsProfileOpen={setIsProfileOpen}
						/>
					)}
				</div>
			</div>
		) : (
			<div className="flex flex-row justify-center items-center gap-5 px-4">
				<Link
					to="login"
					className="hover:bg-gray-200 px-5 py-1 border-[1px] border-gray-400 rounded-md hover:text-[#0d6efd] font-bold text-sm text-[#9C6317]"
				>
					Login
				</Link>
				<Link
					to="signup"
					className="bg-[#9C6317] flex items-center justify-center px-4 py-1 rounded-md text-sm font-medium text-white"
				>
					Signup
				</Link>
			</div>
		)}
	</div>
);

export default Header;
