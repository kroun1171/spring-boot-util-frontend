import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false); // To track modal visibility
  const [selectedFilters, setSelectedFilters] = useState({
    id: false,
    name: false,
    email: false,
  });

  // Fetching data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://springboot-login-util-2.onrender.com/api/all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle selecting/deselecting filters in the modal
  const handleFilterSelection = (e) => {
    const { name, checked } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Apply selected filters
  const applyFilters = () => {
    setShowFilters(false);
  };

  // Filter data based on selected filters and search query
  const filteredData = data.filter((item) => {
    const { id, name, email } = item;

    return (
      (!selectedFilters.id || id.toString().includes(filters.id)) &&
      (!selectedFilters.name ||
        name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!selectedFilters.email ||
        email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (searchQuery === "" ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div>
      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filter Button that opens the modal */}
      <button
        className="btn btn-primary mt-2"
        onClick={() => setShowFilters(true)}
      >
        Filter Data
      </button>

      {/* Modal for selecting filters */}
      {showFilters && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="filterModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="filterModal">
                  Select Filters
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => setShowFilters(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="filterId"
                    name="id"
                    checked={selectedFilters.id}
                    onChange={handleFilterSelection}
                  />
                  <label className="form-check-label" htmlFor="filterId">
                    Filter by ID
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="filterName"
                    name="name"
                    checked={selectedFilters.name}
                    onChange={handleFilterSelection}
                  />
                  <label className="form-check-label" htmlFor="filterName">
                    Filter by Name
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="filterEmail"
                    name="email"
                    checked={selectedFilters.email}
                    onChange={handleFilterSelection}
                  />
                  <label className="form-check-label" htmlFor="filterEmail">
                    Filter by Email
                  </label>
                </div>
                {selectedFilters.id && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="id"
                    placeholder="Enter ID"
                    value={filters.id}
                    onChange={handleFilterChange}
                  />
                )}
                {selectedFilters.name && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="name"
                    placeholder="Enter Name"
                    value={filters.name}
                    onChange={handleFilterChange}
                  />
                )}
                {selectedFilters.email && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="email"
                    placeholder="Enter Email"
                    value={filters.email}
                    onChange={handleFilterChange}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowFilters(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the filtered data and displaying each item */}
          {filteredData.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
