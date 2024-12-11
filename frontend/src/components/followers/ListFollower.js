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
			<div className="text-lg font-bold flex items-center gap-2 text-black pl-3 pb-1 mb-3 border-b">
				{/* <FaList className="text-sm" /> */}
				<div className="grow flex flex-row justify-between items-center">
					<div> Following list</div>
					<div className="text-sm font-medium">
						({listFollowing.length} accounts)
					</div>
				</div>
			</div>
			{listFollowing.length > 0 ? (
				<>
					{listFollowing.map((item, index) => (
						<FollowerItem key={index} user={item} />
					))}
				</>
			) : (
				<div className="text-center text-gray-500 font-medium text-xl mt-10">
					No following
				</div>
			)}
		</div>
	);
}

export default ListFollower;
