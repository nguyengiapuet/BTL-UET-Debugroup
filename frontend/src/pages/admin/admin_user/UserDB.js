import { useEffect, useMemo, useState } from "react";
import Pagination from "../admin_component/pagination/Pagination";
import "../admin_component/style/ProjectDB.scss";
import mockData from "../admin_mockdata/projects.json";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

let PageSize = 10;

function UserDashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	// 1 is active, 2 is deleted
	const [stateOfInfo, setStateOfInfo] = useState("1");
	const [getAllUsers, setGetAllUsers] = useState([]);

	const fetchGetAllUsers = async () => {
		try {
			const response = await axios.get(SummaryApi.getAllUsers.url);

			if (response.data.success) {
				console.log(response.data.data);
				setGetAllUsers([...response.data.data]);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};

	const fetchGetAllUsersDeleted = async () => {
		try {
			const response = await axios.get(SummaryApi.trashAllUsers.url);

			if (response.data.success) {
				console.log(response.data.data);
				setGetAllUsers(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};

	const deleteUser = async (id) => {
		try {
			const response = await axios.post(
				`${SummaryApi.deletedUser.url}/${id}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setGetAllUsers(getAllUsers.filter((user) => user.id !== id));
			}
		} catch (err) {}
	};

	const restoreUser = async (id) => {
		try {
			const response = await axios.post(
				`${SummaryApi.restoreUser.url}/${id}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setGetAllUsers(getAllUsers.filter((user) => user.id !== id));
			}
		} catch (err) {}
	};

	// const deleteUser = async (id) => {
	// 	try {
	// 		const response = await axios.delete(
	// 			`${SummaryApi.deletedUser.url}/${id}`
	// 		);

	// 		if (response.data.success) {
	// 			toast.success(response.data.message);
	// 			setGetAllUsers(getAllUsers.filter((user) => user.id !== id));
	// 		}
	// 	} catch (err) {}
	// };
	const softDeleteUser = async (id) => {
		try {
			const response = await axios.post(
				`${SummaryApi.deleteUserSoft.url}/${id}`,
				{
					timeNow: new Date()
						.toISOString()
						.slice(0, 19)
						.replace("T", " "),
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				setGetAllUsers(getAllUsers.filter((user) => user.id !== id));
			}
		} catch (err) {}
	};

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return getAllUsers.length > 0
			? getAllUsers.slice(firstPageIndex, lastPageIndex)
			: [];
	}, [currentPage, getAllUsers]);

	const handleOnchangeType = (e) => {
		setStateOfInfo(e.target.value);
	};

	const sortUsers = (listUser) => {
		const sortedList = listUser.sort((a, b) => {
			const nameComparison = a.username.localeCompare(b.username);
			if (nameComparison !== 0) {
				return nameComparison;
			}

			const dateA = new Date(a.created_at);
			const dateB = new Date(b.created_at);
			return dateA - dateB;
		});

		return sortedList;
	};

	const handleOnchangeSort = (e) => {
		if (e.target.value === "2") {
			// console.log("e.target.value>>>>>>>>>>>>>>>>>>>>>>", e.target.value);
			const sortedList = sortUsers([...getAllUsers]);

			setGetAllUsers(sortedList);
		} else {
			const sortedList = (arr) =>
				arr.sort((a, b) => {
					const dateA = new Date(a.created_at);
					const dateB = new Date(b.created_at);
					return dateA - dateB;
				});

			setGetAllUsers(sortedList([...getAllUsers]));
		}
	};

	useEffect(() => {
		if (stateOfInfo === "1") {
			fetchGetAllUsers();
		} else {
			fetchGetAllUsersDeleted();
			console.log("change");
		}
	}, [stateOfInfo]);

	return (
		<div>
			<div className="request-container">
				<div className="request-content">
					<div>
						{stateOfInfo === "2" ? (
							<div className="request-title">Users Trash</div>
						) : (
							<div className="request-title">List of Users</div>
						)}
					</div>
					<div className="request-table">
						<div className="section">
							<div className="filter">
								<div className="filter-form">
									<div className="col1">
										<input
											className="form-control"
											type="text"
											placeholder="Search by name"
										/>
									</div>
									<div className="col1">
										<select
											id="status"
											className="form-select"
											type="text"
											defaultValue={"1"}
											onChange={handleOnchangeType}
										>
											<option value="1">Active</option>
											<option value="2">Deleted</option>
										</select>
									</div>
									<div className="col1-custom">
										<span className="sort-type">
											Sorted by:
										</span>
										<select
											className="form-select"
											type="text"
											defaultValue={"1"}
											onChange={handleOnchangeSort}
										>
											<option value="1">Date</option>
											<option value="2">Name</option>
										</select>
									</div>
									<div className="col1">
										<button
											className="search-button"
											type="submit"
										>
											Search
										</button>
									</div>
								</div>
							</div>
							<div className="table-content">
								<div className="top-content">
									<div className="table-header">
										<div className="row">
											<div className="row-data">#</div>
											<div className="row-data1">
												Username
											</div>
											<div className="row-data1">
												Email
											</div>
											<div className="row-data2">
												Created At
											</div>
											<div className="row-data2">
												Updated At
											</div>
											<div className="row-data2">
												Action
											</div>
										</div>
									</div>
									<div className="table-body">
										{currentTableData.length > 0 ? (
											currentTableData.map(
												(item, index) => {
													return (
														<div
															key={item.id}
															className="body-row"
														>
															<div className="body-row-data">
																<span>
																	{index +
																		(currentPage -
																			1) *
																			PageSize +
																		1}
																</span>
															</div>
															<div className="body-row-data1">
																<span>
																	{
																		item.username
																	}
																</span>
															</div>

															<div className="body-row-data1">
																<span>
																	{item.email}
																</span>
															</div>

															<div className="body-row-data2">
																<span>
																	{new Date(
																		item.created_at
																	).toLocaleDateString(
																		"en-GB"
																	)}
																</span>
															</div>
															<div className="body-row-data2">
																<span>
																	{item.updated_at
																		? new Date(
																				item.updated_at
																			).toLocaleDateString(
																				"en-GB"
																			)
																		: "Haven't updated"}{" "}
																</span>
															</div>
															{stateOfInfo ===
															"2" ? (
																<div className="delete-body-button">
																	<button className="ok-button">
																		Restore
																	</button>
																	<button className="reject-button">
																		Delete
																	</button>
																</div>
															) : (
																<div className="body-row-data2 active-body-button">
																	<button className="reject-button">
																		Delete
																	</button>
																</div>
															)}
														</div>
													);
												}
											)
										) : (
											<div className="text-center text-2xl text-gray-500 font-semibold mt-10">
												No one has user yet!
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="pagination-container">
								<Pagination
									className="pagination-bar"
									currentPage={currentPage}
									totalCount={getAllUsers.length}
									pageSize={PageSize}
									onPageChange={(page) =>
										setCurrentPage(page)
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserDashboard;
