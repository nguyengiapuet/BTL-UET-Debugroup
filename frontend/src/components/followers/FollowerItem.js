import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ButtonFollow from "./ButtonFollow";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function FollowerItem({ user }) {
	const [isFollowing, setIsFollowing] = useState();
	const { userData } = useContext(AuthContext);

	return (
		<>
			<div className="min-w-[280px] bg-gray-50 flex items-center justify-between py-2 px-2 rounded-lg shadow-md hover:bg-gray-200 transition-colors">
				{/* User Info */}
				<Link
					to={`/info/${user.username}`}
					className="flex items-center gap-3 cursor-pointer"
				>
					{/* Avatar */}
					{user?.avatar ? (
						<img
							alt={`${user.username}'s avatar`}
							src={user.avatar}
							className="w-10 h-10 rounded-full border-2 border-gray-200 shadow"
						/>
					) : (
						<FaUserCircle className="w-10 h-10" />
					)}
					{/* Username */}
					<div className="flex flex-col items-left">
						<span className="text-sm font-bold text-black truncate max-w-sm">
							{user.username}
						</span>
						<div className="text-sm text-gray-500">5 upvoted</div>
					</div>
				</Link>

				{/* Follow Button */}
				<ButtonFollow
					dataUser={user}
					currentUser={userData}
					setIsFollowing={setIsFollowing}
					isFollowing={isFollowing}
					// className="py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
				/>
			</div>

			<hr />
		</>
	);
}

export default FollowerItem;
