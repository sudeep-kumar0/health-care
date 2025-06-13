import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearData } from "./reducer";
import "./AdminPanel.css"; 
import { useNavigate } from "react-router-dom"; 

const AdminPanel = () => {
  const dispatch = useDispatch(); 
  const formData = useSelector((state) => state.bookingsData);
  const navigate = useNavigate(); 

  const handleClearData = () => {
    dispatch(clearData());
  };

  const handleLogout = () => {
   
    navigate("/");
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <ul className="nav-links">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#" onClick={handleLogout}>Logout</a></li> {/* Attach handleLogout */}
        </ul>
      </div>

      <div className="admin-main-content">
        <h2>Saved Form Data:</h2>

        {/* Table for displaying form data */}
        <table className="form-data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {formData && formData.length > 0 ? (
              formData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.date}</td>
                  <td>{data.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Clear Data Button */}
        <button className="clear-data-btn" onClick={handleClearData}>Clear Data</button>
      </div>

      <div className="admin-footer">
        <p>&copy; 2024 Medic Care. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminPanel;
