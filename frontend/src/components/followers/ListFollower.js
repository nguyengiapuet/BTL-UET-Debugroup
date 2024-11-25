import axios from "axios";
import SummaryApi from "../../common";
import { useEffect, useState } from "react";
import FollowerItem from "./FollowerItem";
import { FaList } from "react-icons/fa";

function ListFollower() {
	const [listFollowing, setListFollowing] = useState([]);

	const getAllFollowing = async () => {
		try {
			const response = await axios.get(SummaryApi.getFollowing.url);

			if (response.data.success) {
				console.log(response.data.data);

				setListFollowing(response.data.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getAllFollowing();
	}, []);

	return (
		<div className="w-full flex flex-col gap-2">
			<span className="text-xl font-semibold px-2 flex items-center gap-2 text-gray-600">
				<FaList /> Following:
			</span>
			{listFollowing.length > 0 ? (
				<>
					{listFollowing.map((item, index) => (
						<FollowerItem key={index} user={item} />
					))}
				</>
			) : (
				<div>No following</div>
			)}
		</div>
	);
}

export default ListFollower;
