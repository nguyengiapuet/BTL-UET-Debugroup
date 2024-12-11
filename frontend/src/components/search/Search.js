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
				`${SummaryApi.searchUserByName.url}/${searchParams.trim()}`
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

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.target.closest(".search-container")) {
				setShowResult(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className="hidden lg:block relative h-fit z-10 search-container">
			<div
				className={`flex border-[2px] transition-colors duration-300 items-center bg-[#D9E2EF] rounded-full py-[2px] px-4 ${
					isFocused ? "border-[#D68E2F] border-1" : "border-[#D9D9D9]"
				}`}
			>
				<FaSearch
					className={`text-gray-500 text-sm ${
						isFocused ? "text-sky-600" : "text-[#D9D9D9]"
					}`}
				/>
				<input
					onChange={handleOnChange}
					type="text"
					name="search"
					autoComplete="off"
					onFocus={() => {
						setShowResult(true);
						setIsFocused(true);
					}}
					className="h-7 w-[400px] z-10 rounded-r-full bg-[#D9E2EF] px-4 outline-none text-sm"
					placeholder="Search"
					onBlur={() => setIsFocused(false)}
				/>
			</div>
			{showResult && searchResult.length > 0 && (
				<div className="search-container flex flex-col bg-white shadow-md rounded-xl absolute top-12 w-full items-start p-2 max-h-[250px] overflow-y-scroll">
					{searchResult.length > 0 &&
						searchResult.map((user) => (
							<UserItem
								key={user.id}
								data={user}
								setShowResult={setShowResult}
							/>
						))}
				</div>
			)}
		</div>
	);
}

export default Search;
