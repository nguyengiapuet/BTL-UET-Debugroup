import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SummaryApi from "../../common";
import UserItem from "./UserItem";

function Search() {
	const [searchParams, setSearchParams] = useState("");
	const [showResult, setShowResult] = useState(false);
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleOnChange = (e) => {
		setSearchParams(e.target.value);
	};

	useEffect(() => {
		if (!searchParams.trim()) {
			setSearchResult([]);
			return;
		}

		const fetchApi = async () => {
			setLoading(true);

			const result = await axios.get(
				`${SummaryApi.searchUser.url}/${searchParams.trim()}`
			);

			if (result.data.success) {
				setSearchResult(result.data.data);
			} else {
				setSearchResult([]);
			}
			setLoading(false);
		};
		fetchApi();
	}, [searchParams]);

	return (
		<div className="relative">
			<div className="flex items-center bg-[#D9E2EF] rounded-full py-[2px] px-4">
				<FaSearch className="text-gray-500 text-sm" />
				<input
					onChange={handleOnChange}
					type="text"
					name="search"
					onFocus={() => setShowResult(true)}
					className="h-8 w-[400px] rounded-r-full bg-[#D9E2EF] px-4 outline-none text-sm"
					placeholder="Search"
				/>
			</div>
			{showResult && searchResult.length > 0 && (
				<div
					onBlur={() => setShowResult(false)}
					className="flex flex-col bg-white shadow-md rounded-xl absolute top-12 w-full items-start p-2 max-h-[250px] overflow-y-scroll"
				>
					{searchResult.length > 0 &&
						searchResult.map((user) => (
							<UserItem key={user.id} data={user} />
						))}
				</div>
			)}
		</div>
	);
}

export default Search;
