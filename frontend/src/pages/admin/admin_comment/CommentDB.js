import { useMemo, useState } from "react";
import Pagination from "../admin_component/pagination/Pagination";
import "../admin_component/style/ProjectDB.scss";
import mockData from "../admin_mockdata/projects.json";

let PageSize = 10;

function CommentDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  // 1 is active, 2 is deleted
  const [stateOfInfo, setStateOfInfo] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return mockData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, mockData]);

  const handleOnchangeType = () => {
    var e = document.getElementById("status");
    setStateOfInfo(e.value);
  };

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
                      onChange={() => handleOnchangeType()}
                    >
                      <option value="1" selected>
                        Active
                      </option>
                      <option value="2">Deleted</option>
                    </select>
                  </div>
                  <div className="col1-custom">
                    <span className="sort-type">Sorted by:</span>
                    <select className="form-select" type="text">
                      <option value="1">Date</option>
                      <option value="2" selected>
                        Project
                      </option>
                    </select>
                  </div>
                  <div className="col1">
                    <button className="search-button" type="submit">
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
                      <div className="row-data1">Project</div>
                      <div className="row-data1">Comment</div>
                      <div className="row-data2">Created At</div>
                      <div className="row-data2">Updated At</div>
                      <div className="row-data2">Action</div>
                    </div>
                  </div>
                  <div className="table-body">
                    {currentTableData.map((item, index) => {
                      return (
                        <div className="body-row">
                          <div className="body-row-data">
                            <span>
                              {index + (currentPage - 1) * PageSize + 1}
                            </span>
                          </div>
                          <div className="body-row-data1">
                            <span>{item.projectName}</span>
                          </div>

                          <div className="body-row-data1">
                            <span>{item.comment}</span>
                          </div>

                          <div className="body-row-data2">
                            <span>{item.created_at}</span>
                          </div>
                          <div className="body-row-data2">
                            <span>{item.updated_at} </span>
                          </div>
                          {stateOfInfo === "2" ? (
                            <div className="body-button">
                              <button className="ok-button">Restore</button>
                            </div>
                          ) : (
                            <div className="body-button">
                              <button className="reject-button">Delete</button>
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
                  totalCount={mockData.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
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
