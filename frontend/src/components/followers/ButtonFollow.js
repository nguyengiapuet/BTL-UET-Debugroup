import axios from "axios";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { MdAdd, MdEdit, MdRemove } from "react-icons/md";

function ButtonFollow({ currentUser, dataUser, setIsFollowing, isFollowing }) {
	const handleFollower = async () => {
		if (!currentUser.id) {
			toast.error("Please login to follow a user.");
			return;
		}
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

	// TODO: handle edit profile.
	const handleEditProfile = () => {
		console.log("edit profile");
	};

	if (currentUser.id === dataUser.id)
		return (
			<button
				onClick={handleEditProfile}
				className="px-3 py-[5px] bg-[#9C6317] rounded-md hover:bg-[#9C6317]/80 text-white font-semibold hover:text-slate-100 flex items-center gap-1"
			>
				<MdEdit />
				Edit profile
			</button>
		);

	return (
		<div>
			{!isFollowing ? (
				<button
					onClick={handleFollower}
					className="px-3 py-[5px] bg-[#9C6317] rounded-md hover:bg-[#9C6317]/80 text-white font-semibold hover:text-slate-100 flex items-center gap-1"
				>
					<MdAdd />
					Follow
				</button>
			) : (
				<button
					onClick={handleUnFollower}
					className="px-3 py-[5px] bg-[#9C6317] rounded-md hover:bg-[#9C6317]/80 text-white font-semibold hover:text-slate-100 flex items-center gap-1"
				>
					<MdRemove />
					Unfollow
				</button>
			)}
		</div>
	);
}

export default ButtonFollow;
