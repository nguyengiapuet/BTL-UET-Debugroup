import { useEffect, useMemo, useState } from "react";
import Pagination from "../admin_component/pagination/Pagination";
import "../admin_component/style/ProjectDB.scss";
import mockData from "../admin_mockdata/projects.json";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";

let PageSize = 10;

function CommentDashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	// 1 is active, 2 is deleted
	const [stateOfInfo, setStateOfInfo] = useState(1);
	const [allComments, setAllComments] = useState([]);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return allComments.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, allComments]);

	const handleOnchangeType = () => {
		var e = document.getElementById("status");
		setStateOfInfo(e.value);
	};

	const getAllComments = async () => {
		try {
			const response = await axios.get(
				SummaryApi.getAllCommentsByAdmin.url
			);

			if (response.data.success) {
				setAllComments(response.data.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleDeleteComment = async (item) => {
		try {
			const response = await axios.post(
				SummaryApi.deleteCommentByAdmin.url,
				{
					idComment: item.id,
				}
			);

			if (response.data.success) {
				toast.success("Comment deleted successfully!");
				getAllComments();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const sortProjects = (listProject) => {
		const sortedList = listProject.sort((a, b) => {
			const nameComparison = a.title.localeCompare(b.title);
			if (nameComparison !== 0) {
				return nameComparison;
			}

			const dateA = new Date(a.comments_at);
			const dateB = new Date(b.comments_at);
			return dateA - dateB;
		});

		return sortedList;
	};

	const handleOnchangeSort = (e) => {
		if (e.target.value === "2") {
			// console.log("e.target.value>>>>>>>>>>>>>>>>>>>>>>", e.target.value);
			const sortedList = sortProjects([...allComments]);

			setAllComments(sortedList);
		} else {
			const sortedList = (arr) =>
				arr.sort((a, b) => {
					const dateA = new Date(a.comments_at);
					const dateB = new Date(b.comments_at);
					return dateA - dateB;
				});

			setAllComments(sortedList([...allComments]));
		}
	};

	useEffect(() => {
		getAllComments();
	}, []);

	return (
		<div>
			<div className="request-container">
				<div className="request-content">
					<div className="request-title">List of comments</div>
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
											<option value="2">Project</option>
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
												User
											</div>
											<div className="row-data2">
												Comment
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
																	{item.title}
																</span>
															</div>

															<div className="body-row-data1">
																<span>
																	{
																		item.username
																	}
																</span>
															</div>

															<div className="body-row-data2">
																<span className="line-clamp-2 break-words">
																	{
																		item.content
																	}
																</span>
															</div>

															<div className="body-row-data2 flex-wrap overflow-hidden">
																<span>
																	{new Date(
																		item.comments_at
																	).toLocaleDateString(
																		"en-GB"
																	)}
																</span>
															</div>
															<div className="body-row-data2">
																<span>
																	{new Date(
																		item.update_at
																	).toLocaleDateString(
																		"en-GB"
																	)}
																</span>
															</div>
															{stateOfInfo ===
															"2" ? (
																<div className="body-button">
																	<button className="ok-button">
																		Restore
																	</button>
																</div>
															) : (
																<div className="body-row-data2 body-button">
																	<button
																		onClick={() =>
																			handleDeleteComment(
																				item
																			)
																		}
																		className="reject-button"
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
												No one has comment yet!
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="pagination-container">
								<Pagination
									className="pagination-bar"
									currentPage={currentPage}
									totalCount={allComments.length}
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

export default CommentDashboard;
