import { useEffect, useMemo, useState } from "react";
import Pagination from "../admin_component/pagination/Pagination";
import "../admin_component/style/ProjectDB.scss";
import mockData from "../admin_mockdata/projects.json";
import axios from "axios";
import SummaryApi from "../../../common";
import { toast } from "react-toastify";

let PageSize = 10;

function ProjectDashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	// 1 is active, 2 is deleted
	const [stateOfInfo, setStateOfInfo] = useState(1);
	const [getAllPens, setGetAllPens] = useState([]);

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

	const handleOnchangeType = () => {
		var e = document.getElementById("status");
		setStateOfInfo(e.value);
	};

	const handleDelete = async (item) => {
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

	useEffect(() => {
		fetchGetAllPens();
	}, []);

	return (
		<div>
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
											className="form-select"
											type="text"
											onChange={() =>
												handleOnchangeType()
											}
										>
											<option value="1" selected>
												Active
											</option>
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
										>
											<option value="1">Date</option>
											<option value="2" selected>
												Name
											</option>
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
										{currentTableData.map((item, index) => {
											return (
												<div className="body-row">
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
															{item.created_at}
														</span>
													</div>
													<div className="body-row-data2">
														<span>
															{item.updated_at}{" "}
														</span>
													</div>
													{stateOfInfo === "2" ? (
														<div className="body-button">
															<button className="ok-button">
																Restore
															</button>
														</div>
													) : (
														<div className="body-button">
															<button
																onClick={() =>
																	handleDelete(
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
										})}
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
