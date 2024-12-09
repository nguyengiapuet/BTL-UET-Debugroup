import { useContext, useEffect, useMemo, useState } from "react";
import Pagination from "../admin_component/pagination/Pagination";
import "../admin_component/style/ProjectDB.scss";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import DeleteModal from "../admin_component/modal/DeleteModal";
import RestoreModal from "../admin_component/modal/RestoreModal";
import { AuthContext } from "../../../context/AuthContext";
import { MdArrowBack, MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import PageNotFound from "../../../components/template/404page";

let PageSize = 10;

function UserDashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	// 1 is active, 2 is deleted
	const [stateOfInfo, setStateOfInfo] = useState("1");
	const [getAllUsers, setGetAllUsers] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState("");
	const [openRestoreModal, setOpenRestoreModal] = useState(false);
	const { userData } = useContext(AuthContext);

	useEffect(() => {
		document.title = "User Dashboard";
	}, []);

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

	// function implement sort.
	const sortUsers = (listUser, sortBy) => {
		if (sortBy === "username") {
			return listUser.sort((a, b) =>
				a.username.localeCompare(b.username)
			);
		} else if (sortBy === "date") {
			return listUser.sort((a, b) => {
				const dateA = new Date(a.created_at);
				const dateB = new Date(b.created_at);
				return dateA - dateB;
			});
		}
		return listUser;
	};

	const handleOnchangeSort = (e) => {
		// 2 is sort by title, else is sort by date.
		const sortValue = e.target.value;
		let sortedList;

		if (sortValue === "2") {
			// Sort by title
			sortedList = sortUsers([...getAllUsers], "username");
		} else {
			// Sort by date
			sortedList = sortUsers([...getAllUsers], "date");
		}

		setGetAllUsers(sortedList);
	};

	useEffect(() => {
		if (stateOfInfo === "1") {
			fetchGetAllUsers();
		} else {
			fetchGetAllUsersDeleted();
		}
	}, [stateOfInfo]);

	// keep track status of project in active/deleted.
	const [activeUser, setActiveUser] = useState(true);
	// Delete user
	const handleDeleteUser = (userId, isActive) => {
		setActiveUser(isActive);
		setSelectedUser(userId);
		setOpenModal(true);
	};
	const onCancel = () => {
		setOpenModal(false);
	};
	const handleConfirmDeleteUser = async () => {
		setOpenModal(false);
		console.log(activeUser);
		if (activeUser) {
			deleteActive();
		} else {
			deleteForever();
		}
	};
	const deleteActive = async () => {
		try {
			const response = await axios.post(
				`${SummaryApi.deleteUserSoft.url}/${selectedUser}`,
				{
					timeNow: new Date()
						.toISOString()
						.slice(0, 19)
						.replace("T", " "),
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchGetAllUsers();
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const deleteForever = async () => {
		try {
			const response = await axios.post(
				`${SummaryApi.deletedUser.url}/${selectedUser}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchGetAllUsersDeleted();
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	// Restore users
	const handleRestoreUser = (userId) => {
		setOpenRestoreModal(true);
		setSelectedUser(userId);
	};
	const restoreUser = async () => {
		try {
			const response = await axios.post(
				`${SummaryApi.restoreUser.url}/${selectedUser}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchGetAllUsersDeleted();
			}
		} catch (err) {
			console.log(err.message);
		}
	};
	const handleConfirmRestore = async () => {
		setOpenRestoreModal(false);
		restoreUser();
	};
	const onRestoreCancel = () => {
		setOpenRestoreModal(false);
	};

	// Function to implement search.
	const [query, setSearchQuery] = useState("");

	const handleSearchUser = (query) => {
		console.log(query);
		setSearchQuery(query);
		if (query === "" && stateOfInfo === "1") {
			fetchGetAllUsers();
		}
		if (query === "" && stateOfInfo === "2") {
			fetchGetAllUsersDeleted();
		}
	};
	const handleSubmitSearch = () => {
		if (stateOfInfo === "1") {
			fetchSearchUsersInActive(query);
		} else {
			fetchSearchUsersInDelete(query);
		}
	};
	const fetchSearchUsersInActive = async (query) => {
		try {
			const response = await axios.get(
				`${SummaryApi.searchUserByName.url}/${query}`
			);

			if (response.data.success) {
				console.log(response.data.data);
				setGetAllUsers(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};
	const fetchSearchUsersInDelete = async (query) => {
		try {
			const response = await axios.get(
				`${SummaryApi.searchDeletedUserByName.url}/${query}`
			);

			if (response.data.success) {
				console.log(response.data.data);
				setGetAllUsers(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};

	if (userData.role !== "admin") {
		return <PageNotFound />;
	}

	return (
		<div>
			<DeleteModal
				isOpen={openModal}
				title={activeUser ? "Delete User" : "Delete Forever"}
				onConfirm={handleConfirmDeleteUser}
				fieldOfDelete="user"
				onCancel={onCancel}
			/>
			<RestoreModal
				isOpen={openRestoreModal}
				title="Restore user"
				onConfirm={handleConfirmRestore}
				fieldOfDelete="user"
				onCancel={onRestoreCancel}
			/>

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
											onChange={(e) => {
												handleSearchUser(
													e.target.value
												);
											}}
											onKeyPress={(e) => {
												if (e.key === "Enter") {
													handleSubmitSearch();
												}
											}}
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
											onChange={(e) =>
												handleOnchangeSort(e)
											}
										>
											<option value="1">Date</option>
											<option value="2">Name</option>
										</select>
									</div>
									<div className="col1">
										<button
											className="search-button"
											type="submit"
											onClick={handleSubmitSearch}
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
																	<button
																		className="ok-button"
																		onClick={() =>
																			handleRestoreUser(
																				item.id
																			)
																		}
																	>
																		Restore
																	</button>
																	<button
																		className="reject-button"
																		onClick={() =>
																			handleDeleteUser(
																				item.id,
																				false
																			)
																		}
																	>
																		Delete
																	</button>
																</div>
															) : (
																<div className="body-row-data2 active-body-button">
																	<button
																		className="reject-button"
																		onClick={() =>
																			handleDeleteUser(
																				item.id,
																				true
																			)
																		}
																	>
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
