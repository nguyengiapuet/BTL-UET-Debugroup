import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ButtonFollow from "./ButtonFollow";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function FollowerItem({ user }) {
	const [isFollowing, setIsFollowing] = useState();
	const { userData } = useContext(AuthContext);

	return (
		<div className="min-w-full flex gap-4 items-center justify-between hover:bg-gray-200 p-1 rounded-md">
			<Link
				to={`/info/${user.username}`}
				className="flex items-center gap-1.5 cursor-pointer"
			>
				{user?.avatar ? (
					<img
						alt=""
						src={user.avatar}
						className="size-12 rounded-full border shadow-sm"
					/>
				) : (
					<FaUserCircle />
				)}
				<span className="text-xl max-w-24 truncate font-semibold overflow-hidden ">
					{user.username}
				</span>
			</Link>
			<ButtonFollow
				dataUser={user}
				currentUser={userData}
				setIsFollowing={setIsFollowing}
				isFollowing={isFollowing}
			/>
		</div>
	);
}

export default FollowerItem;
