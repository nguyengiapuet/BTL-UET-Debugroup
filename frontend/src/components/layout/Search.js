import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SummaryApi from "../../common";
import UserItem from "../search/UserItem";

function Search({ isFocused, setIsFocused }) {
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
			if (!event.target.closest(".search")) {
				setShowResult(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div
			className={`w-full border-2 search rounded-3xl relative flex items-center px-4 transition-colors duration-300 ${
				isFocused ? "border-[#D68E2F] border-1" : "border-[#D9D9D9]"
			}`}
		>
			<FaSearch
				className={`${isFocused ? "text-sky-600" : "text-[#D9D9D9]"}`}
			/>
			<input
				type="text"
				name="search"
				autoComplete="off"
				onChange={handleOnChange}
				placeholder="Search following"
				className="w-full rounded-full font-normal text-sm py-2 px-2 outline-none"
				onFocus={() => {
					setShowResult(true);
					setIsFocused(true);
				}}
				onBlur={() => setIsFocused(false)}
			/>
			{showResult && searchResult.length > 0 && (
				<div className="z-[999] flex flex-col bg-slate-200 shadow-md rounded-xl absolute top-12 left-0 w-full items-start p-2 max-h-[250px] overflow-y-scroll">
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
