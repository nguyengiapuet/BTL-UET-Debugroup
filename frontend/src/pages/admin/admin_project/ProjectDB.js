import { useContext, useEffect, useMemo, useState } from "react";
import Pagination from "../admin_component/pagination/Pagination";
import "../admin_component/style/ProjectDB.scss";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import DeleteModal from "../admin_component/modal/DeleteModal";
import RestoreModal from "../admin_component/modal/RestoreModal";
import { AuthContext } from "../../../context/AuthContext";
import PageNotFound from "../../../components/template/404page";
import Loading from "../../../components/animations/Loading";

let PageSize = 10;

function ProjectDashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	// 1 is active, 2 is deleted
	const [stateOfInfo, setStateOfInfo] = useState("1");
	const [getAllPens, setGetAllPens] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [openRestoreModal, setOpenRestoreModal] = useState(false);
	const [selectedIdProject, setSelectedIdProject] = useState(-1);
	const [searchQuery, setSearchQuery] = useState("");
	const { userData } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		document.title = "Project Dashboard";
	}, []);

	const fetchGetAllPens = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(SummaryApi.allPens.url);

			if (response.data.success) {
				setGetAllPens([...response.data.data]);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
		setIsLoading(false);
	};
	const fetchDeletedPens = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(SummaryApi.deletedPens.url);

			if (response.data.success) {
				setGetAllPens(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
		setIsLoading(false);
	};
	const fetchSearchPens = async (query) => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${SummaryApi.searchProjectByName.url}/${query}`
			);

			if (response.data.success) {
				setGetAllPens(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
		setIsLoading(false);
	};
	const fetchSearchDeletedPens = async (query) => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`${SummaryApi.searchDeletedProjectByName.url}/${query}`
			);

			if (response.data.success) {
				setGetAllPens(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
		setIsLoading(false);
	};

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return getAllPens.length > 0
			? getAllPens.slice(firstPageIndex, lastPageIndex)
			: [];
	}, [currentPage, getAllPens]);

	// search project by name
	const handleSearchByName = (query) => {
		setSearchQuery(query);
		if (query === "" && stateOfInfo === "1") {
			fetchGetAllPens();
		}
		if (query === "" && stateOfInfo === "2") {
			fetchDeletedPens();
		}
	};
	const handleSubmitSearch = () => {
		if (stateOfInfo === "1") {
			fetchSearchPens(searchQuery);
		} else {
			fetchSearchDeletedPens(searchQuery);
		}
	};

	// change state of project: delete or active.
	const handleOnchangeType = (e) => {
		setStateOfInfo(e.target.value);
	};

	// function implement sort.
	const sortProjects = (listProject, sortBy) => {
		if (sortBy === "title") {
			return listProject.sort((a, b) => a.title.localeCompare(b.title));
		} else if (sortBy === "date") {
			return listProject.sort((a, b) => {
				const dateA = new Date(a.created_at);
				const dateB = new Date(b.created_at);
				return dateA - dateB;
			});
		}
		return listProject;
	};

	const handleOnchangeSort = (e) => {
		// 2 is sort by title, else is sort by date.
		const sortValue = e.target.value;
		let sortedList;

		if (sortValue === "2") {
			// Sort by title
			sortedList = sortProjects([...getAllPens], "title");
		} else {
			// Sort by date
			sortedList = sortProjects([...getAllPens], "date");
		}

		setGetAllPens(sortedList);
	};

	useEffect(() => {
		if (stateOfInfo === "1") {
			fetchGetAllPens();
		} else {
			fetchDeletedPens();
		}
	}, [stateOfInfo]);

	// keep track status of project in active/deleted.
	const [activeProject, setActiveProject] = useState(true);
	// isActive is delete project from active. else is project that users have deleted.
	const handleDeleteProject = (projectId, isActive) => {
		setActiveProject(isActive);
		setSelectedIdProject(projectId);
		setOpenModal(true);
	};
	const onCancel = () => {
		setOpenModal(false);
	};
	const handleConfirmDeleteProject = async () => {
		setOpenModal(false);
		if (activeProject) {
			deleteActive();
		} else {
			deleteForever();
		}
	};

	// TODO: handle Restore project.
	const handleRestoreProject = (projectId) => {
		setOpenRestoreModal(true);
		setSelectedIdProject(projectId);
	};

	const handleConfirmRestore = async () => {
		setOpenRestoreModal(false);
		restoreProject();
	};
	const onRestoreCancel = () => {
		setOpenRestoreModal(false);
	};
	const restoreProject = async () => {
		try {
			const response = await axios.put(
				`${SummaryApi.restorePen.url}/${selectedIdProject}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchDeletedPens();
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const deleteActive = async () => {
		try {
			const response = await axios.delete(
				`${SummaryApi.deletePens.url}/${selectedIdProject}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchGetAllPens();
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const deleteForever = async () => {
		try {
			const response = await axios.delete(
				`${SummaryApi.deletePenForever.url}/${selectedIdProject}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchDeletedPens();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	if (userData.role !== "admin") {
		return <PageNotFound />;
	}

	return (
		<div>
			<DeleteModal
				isOpen={openModal}
				title={activeProject ? "Delete Project" : "Delete Forever"}
				onConfirm={handleConfirmDeleteProject}
				fieldOfDelete="project"
				onCancel={onCancel}
			/>
			<RestoreModal
				isOpen={openRestoreModal}
				title="Restore project"
				onConfirm={handleConfirmRestore}
				fieldOfDelete="project"
				onCancel={onRestoreCancel}
			/>
			{isLoading && <Loading/>}
			<div className="request-container">
				<div className="request-content">
					<div className="request-title">List of projects</div>
					<div className="request-table">
						<div className="section">
							<div className="filter">
								<div className="filter-form">
									<div className="col1">
										<input
											className="form-control"
											type="text"
											placeholder="Search by name"
											onChange={(e) =>
												handleSearchByName(
													e.target.value
												)
											}
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
											defaultValue={"1"}
											className="form-select"
											type="text"
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
												Project
											</div>
											<div className="row-data1">
												Status
											</div>
											<div className="row-data2">
												Created at
											</div>
											<div className="row-data2">
												Updated at
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
															key={index}
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
																	{item.title}
																</span>
															</div>

															<div className="body-row-data1">
																<span>
																	<span className="font-semibold">
																		{
																			item.total_likes
																		}{" "}
																	</span>
																	likes,{" "}
																	<span className="font-semibold">
																		{
																			item.total_comments
																		}{" "}
																	</span>
																	comments
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
																	{new Date(
																		item.updated_at
																	).toLocaleDateString(
																		"en-GB"
																	)}
																</span>
															</div>
															{stateOfInfo ===
															"2" ? (
																<div className="delete-body-button">
																	<button
																		className="ok-button"
																		onClick={() =>
																			handleRestoreProject(
																				item.id
																			)
																		}
																	>
																		Restore
																	</button>
																	<button
																		className="reject-button"
																		onClick={() =>
																			handleDeleteProject(
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
																		onClick={() => {
																			handleDeleteProject(
																				item.id,
																				true
																			);
																		}}
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
												No one has project yet!
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="pagination-container">
								<Pagination
									className="pagination-bar"
									currentPage={currentPage}
									totalCount={getAllPens.length}
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

export default ProjectDashboard;
