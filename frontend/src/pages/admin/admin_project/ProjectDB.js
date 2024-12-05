import { useEffect, useMemo, useState } from "react";
import Pagination from "../admin_component/pagination/Pagination";
import "../admin_component/style/ProjectDB.scss";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import DeleteModal from "../admin_component/modal/DeleteModal";
import RestoreModal from "../admin_component/modal/RestoreModal";

let PageSize = 10;

function ProjectDashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	// 1 is active, 2 is deleted
	const [stateOfInfo, setStateOfInfo] = useState(1);
	const [getAllPens, setGetAllPens] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);

	const fetchGetAllPens = async () => {
		try {
			const response = await axios.get(SummaryApi.allPens.url);

			if (response.data.success) {
				console.log(response.data.data);
				setGetAllPens(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return getAllPens.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, getAllPens]);

	// change state of project: delete or active.
	const handleOnchangeType = () => {
		var e = document.getElementById("status");
		setStateOfInfo(e.value);
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
		fetchGetAllPens();
	}, []);

	// TODO: handleDeleteProject in active
	const [activeProject, setActiveProject] = useState(true);
	const handleDeleteActiveProject = (project) => {
		setActiveProject(true);
		setOpenModal(true);
		setSelectedProject(project);
	};
	const onCancel = () => {
		setOpenModal(false);
	};

	const handleConfirmDeleteInActive = async () => {
		setOpenModal(false);
		deleteActive(selectedProject);
	};

	// handleDeleteProject in deleted
	const handleDeleteForever = () => {
		setActiveProject(false);
		setOpenModal(true);
		console.log("Delete this project");
	};
	// TODO: handle Restore project.
	const handleRestoreProject = () => {
		setOpenModal(true);
		console.log("Delete this project");
	};
	const handleConfirmDeleteInDeleted = async () => {
		setOpenModal(false);
		// add api.
		// deleteForever(project)
	};
	const deleteActive = async (item) => {
		try {
			const response = await axios.delete(
				`${SummaryApi.deletePens.url}/${item.id}`
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchGetAllPens();
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const deleteForever = async (item) => {};
	return (
		<div>
			<DeleteModal
				isOpen={openModal}
				title={activeProject ? "Delete Project" : "Delete Forever"}
				onConfirm={handleConfirmDeleteInActive}
				fieldOfDelete="project"
				onCancel={onCancel}
			/>
			<RestoreModal
				isOpen={openModal}
				title="Restore project"
				onConfirm={handleConfirmDeleteInDeleted}
				fieldOfDelete="project"
				onCancel={onCancel}
			/>

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
										/>
									</div>
									<div className="col1">
										<select
											id="status"
											defaultValue={"1"}
											className="form-select"
											type="text"
											onChange={() =>
												handleOnchangeType()
											}
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
																		onClick={
																			handleRestoreProject
																		}
																	>
																		Restore
																	</button>
																	<button
																		className="reject-button"
																		onClick={
																			handleDeleteForever
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
																			handleDeleteActiveProject(
																				item
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
