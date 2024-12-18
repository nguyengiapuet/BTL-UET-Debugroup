import { useContext, useEffect, useMemo, useState } from "react";
import Pagination from "../admin_component/pagination/Pagination";
import "../admin_component/style/ProjectDB.scss";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";
import DeleteModal from "../admin_component/modal/DeleteModal";
import RestoreModal from "../admin_component/modal/RestoreModal";
import { Modal } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import PageNotFound from "../../../components/template/404page";

let PageSize = 10;

function CommentDashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	// 1 is active, 2 is deleted
	const [stateOfInfo, setStateOfInfo] = useState("1");
	const [allComments, setAllComments] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [openRestoreModal, setOpenRestoreModal] = useState(false);
	const { userData } = useContext(AuthContext);

	useEffect(() => {
		document.title = "Comment Dashboard";
	}, []);

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
				console.log(response.data.data);
				setAllComments(response.data.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const fetchDeletedComments = async () => {
		try {
			const response = await axios.get(SummaryApi.getDeletedComments.url);

			if (response.data.success) {
				setAllComments(response.data.data);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	// function implement sort.
	const sortComments = (listComment, sortBy) => {
		if (sortBy === "username") {
			return listComment.sort((a, b) =>
				a.username.localeCompare(b.username)
			);
		} else if (sortBy === "date") {
			return listComment.sort((a, b) => {
				const dateA = new Date(a.comments_at);
				const dateB = new Date(b.comments_at);
				return dateA - dateB;
			});
		}
		return listComment;
	};

	const handleOnchangeSort = (e) => {
		// 2 is sort by title, else is sort by date.
		const sortValue = e.target.value;
		let sortedList;

		if (sortValue === "2") {
			// Sort by title
			sortedList = sortComments([...allComments], "username");
		} else {
			// Sort by date
			sortedList = sortComments([...allComments], "date");
		}

		setAllComments(sortedList);
	};

	useEffect(() => {
		if (stateOfInfo === "1") {
			getAllComments();
		} else {
			fetchDeletedComments();
		}
	}, [stateOfInfo]);

	// keep track status of comment in active/deleted.
	const [activeComment, setActiveComment] = useState(true);
	const [selectedComment, setSelectedComment] = useState("");

	// handle delete comment
	const handleDeleteComment = (commentId, isActive) => {
		setActiveComment(isActive);
		setSelectedComment(commentId);
		setOpenModal(true);
	};
	const onCancel = () => {
		setOpenModal(false);
	};
	const handleConfirmDeleteComment = async () => {
		setOpenModal(false);
		console.log(activeComment);
		if (activeComment) {
			deleteActive();
		} else {
			deleteForever();
		}
	};
	const deleteActive = async () => {
		try {
			const response = await axios.post(
				SummaryApi.deleteCommentByAdmin.url,
				{
					idComment: selectedComment,
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				getAllComments();
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	const deleteForever = async () => {
		try {
			const response = await axios.post(
				SummaryApi.deleteCommentForever.url,
				{
					idComment: selectedComment,
				}
			);

			if (response.data.success) {
				toast.success(response.data.message);
				fetchDeletedComments();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	// handle restore comment.
	const handleRestoreComment = (commentId) => {
		setOpenRestoreModal(true);
		setSelectedComment(commentId);
	};
	const handleConfirmRestore = () => {
		setOpenRestoreModal(false);
		restoreComment();
	};
	const onRestoreCancel = () => {
		setOpenRestoreModal(false);
	};
	const restoreComment = async () => {
		try {
			const response = await axios.post(SummaryApi.restoreComment.url, {
				idComment: selectedComment,
			});

			if (response.data.success) {
				toast.success(response.data.message);
				fetchDeletedComments();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	// implement search comments.
	const [query, setSearchQuery] = useState("");

	const handleSearchComment = (query) => {
		console.log(query);
		setSearchQuery(query);
		if (query === "" && stateOfInfo === "1") {
			getAllComments();
		}
		if (query === "" && stateOfInfo === "2") {
			fetchDeletedComments();
		}
	};
	const handleSubmitSearch = () => {
		if (stateOfInfo === "1") {
			fetchSearchCommentsInActive(query);
		} else {
			fetchSearchCommentsInDelete(query);
		}
	};
	const fetchSearchCommentsInActive = async (query) => {
		try {
			const response = await axios.get(
				`${SummaryApi.searchComment.url}/${query}`
			);

			if (response.data.success) {
				console.log(response.data.data);
				setAllComments(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};
	const fetchSearchCommentsInDelete = async (query) => {
		try {
			const response = await axios.get(
				`${SummaryApi.searchDeleteComment.url}/${query}`
			);

			if (response.data.success) {
				console.log(response.data.data);
				setAllComments(response.data.data);
			}
		} catch (err) {
			console.log(err.message);
			return;
		}
	};

	// Modal to view entire comment content
	const [openViewComment, setOpenViewComment] = useState(false);
	const [commentContent, setCommentContent] = useState("");
	const cancelViewComment = () => {
		setOpenViewComment(false);
	};
	const handleShowCommentModal = (content) => {
		setCommentContent(content);
		setOpenViewComment(true);
	};

	if (userData.role !== "admin") {
		return <PageNotFound />;
	}
	return (
		<div>
			<DeleteModal
				isOpen={openModal}
				title={activeComment ? "Delete Comment" : "Delete Forever"}
				onConfirm={handleConfirmDeleteComment}
				fieldOfDelete="comment"
				onCancel={onCancel}
			/>
			<RestoreModal
				isOpen={openRestoreModal}
				title="Restore comment"
				onConfirm={handleConfirmRestore}
				fieldOfDelete="comment"
				onCancel={onRestoreCancel}
			/>
			<Modal
				title="Comment detail"
				open={openViewComment}
				onOk={cancelViewComment}
				onCancel={cancelViewComment}
				width={500}
			>
				<div className="max-h-[500px] overflow-y-auto">
					{commentContent}
				</div>
			</Modal>

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
											placeholder="Search by comment"
											onChange={(e) => {
												handleSearchComment(
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
											<option value="2">Username</option>
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
											<div className="row-data2">
												Project
											</div>
											<div className="row-data2">
												User
											</div>
											<div className="row-data1">
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
															title="Click to show comment"
														>
															<div
																className="body-row-data"
																onClick={() => {
																	handleShowCommentModal(
																		item.content
																	);
																}}
															>
																<span>
																	{index +
																		(currentPage -
																			1) *
																			PageSize +
																		1}
																</span>
															</div>
															<div
																className="body-row-data2"
																onClick={() => {
																	handleShowCommentModal(
																		item.content
																	);
																}}
															>
																<span>
																	{item.title}
																</span>
															</div>

															<div
																className="body-row-data2"
																onClick={() => {
																	handleShowCommentModal(
																		item.content
																	);
																}}
															>
																<span>
																	{
																		item.username
																	}
																</span>
															</div>

															<div
																className="body-row-data1"
																onClick={() => {
																	handleShowCommentModal(
																		item.content
																	);
																}}
															>
																<span className="line-clamp-2 break-words">
																	{
																		item.content
																	}
																</span>
															</div>

															<div
																className="body-row-data2 flex-wrap overflow-hidden"
																onClick={() => {
																	handleShowCommentModal(
																		item.content
																	);
																}}
															>
																<span>
																	{new Date(
																		item.comments_at
																	).toLocaleDateString(
																		"en-GB"
																	)}
																</span>
															</div>
															<div
																className="body-row-data2"
																onClick={() => {
																	handleShowCommentModal(
																		item.content
																	);
																}}
															>
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
																<div className="delete-body-button">
																	<button
																		className="ok-button"
																		onClick={() =>
																			handleRestoreComment(
																				item.id
																			)
																		}
																	>
																		Restore
																	</button>
																	<button
																		className="reject-button"
																		onClick={() =>
																			handleDeleteComment(
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
																		onClick={() =>
																			handleDeleteComment(
																				item.id,
																				true
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
