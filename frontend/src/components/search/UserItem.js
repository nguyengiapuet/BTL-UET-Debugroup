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
			className="flex items-center gap-2 cursor-pointer w-full hover:bg-slate-100 p-2 rounded-xl transition-all duration-150"
		>
			{data.avatar ? (
				<img
					className="rounded-full size-12"
					src={data.avatar}
					alt={data.username}
				/>
			) : (
				<FaUserCircle className="size-12" />
			)}
			<span className="text-lg font-semibold">{data.username}</span>
		</div>
	);
}

export default UserItem;
