import axios from "axios";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { MdAdd, MdEdit, MdRemove } from "react-icons/md";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addFollower, removeFollower } from "../../actions/followersActions";
import { message } from "antd";

const socket = io("http://fall2024c8g3.int3306.freeddns.org");
function ButtonFollow({ currentUser, dataUser, setIsFollowing, isFollowing }) {
	const dispatch = useDispatch();

	const handleFollower = async () => {
		if (!currentUser.id) {
			message.error("Please login to follow a user.");
			return;
		}
		try {
			const response = await axios.post(SummaryApi.createFollower.url, {
				followingId: dataUser.id,
			});

			if (response.data.success) {
				message.success(response.data.message);
				setIsFollowing(true);
				socket.emit("notification", {
					issuerId: currentUser.id,
					issuerName: currentUser.username,
					recipientId: dataUser.id,
					type: "FOLLOW",
				});
				dispatch(addFollower(dataUser.id));
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
				message.success(response.data.message);
				setIsFollowing(false);
				dispatch(removeFollower(dataUser.id));
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
					className="z-10 text-sm px-3 py-[5px] bg-[#9C6317] rounded-md hover:bg-[#9C6317]/80 text-white font-semibold hover:text-slate-100 flex items-center gap-1"
				>
					<MdAdd />
					Follow
				</button>
			) : (
				<button
					onClick={handleUnFollower}
					className="z-10 px-3 py-[5px] text-sm bg-[#9C6317] rounded-md hover:bg-[#9C6317]/80 text-white font-semibold hover:text-slate-100 flex items-center gap-1"
				>
					<MdRemove />
					Unfollow
				</button>
			)}
		</div>
	);
}

export default ButtonFollow;
