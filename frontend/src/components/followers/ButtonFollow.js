import axios from "axios";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";

function ButtonFollow({ currentUser, dataUser, setIsFollowing, isFollowing }) {
	const handleFollower = async () => {
		try {
			const response = await axios.post(SummaryApi.createFollower.url, {
				followingId: dataUser.id,
			});

			if (response.data.success) {
				toast.success(response.data.message);
				setIsFollowing(true);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleUnFollower = async () => {
		try {
			const response = await axios.delete(
				`${SummaryApi.deleteFollower.url}/${dataUser.id}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setIsFollowing(false);
			}
		} catch (err) {
			console.log(err.message);
		}
	};
	const fetchGetFollowUser = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.getFollower.url}/${dataUser.id}`
			);

			if (response.data.success) {
				setIsFollowing(response.data.isFollowing);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		if (dataUser?.id) fetchGetFollowUser();
	}, [dataUser.id]);

	return (
		<>
			{currentUser.id !== dataUser.id &&
				(!isFollowing ? (
					<button
						onClick={handleFollower}
						className="px-2 py-1 bg-green-500 rounded-md hover:bg-green-600 text-white font-semibold hover:text-slate-100 flex items-center gap-1"
					>
						<MdAdd />
						Follow
					</button>
				) : (
					<button
						onClick={handleUnFollower}
						className="px-2 py-1 bg-green-500 rounded-md hover:bg-green-600 text-white font-semibold hover:text-slate-100 flex items-center gap-1"
					>
						UnFollow
					</button>
				))}
		</>
	);
}

export default ButtonFollow;
