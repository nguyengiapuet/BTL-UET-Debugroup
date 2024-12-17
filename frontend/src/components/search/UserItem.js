import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function UserItem({ data, setShowResult }) {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => {
				navigate(`/info/${data.username}`);
				setShowResult(false);
			}}
			className="flex items-center gap-2 bg-gray-100 cursor-pointer w-full hover:bg-slate-300 p-2 rounded-xl shadow-md transition-all duration-150"
		>
			{data.avatar ? (
				<img
					className="rounded-full size-10"
					src={data.avatar}
					alt={data.username}
				/>
			) : (
				<FaUserCircle className="size-10" />
			)}
			<span className="text-md font-medium">{data.username}</span>
		</div>
	);
}

export default UserItem;
