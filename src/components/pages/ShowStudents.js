import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadSavedData, removeDataFromStorage } from "../../renderer";
const { ipcRenderer } = require("electron");
const {
  HANDLE_FETCH_DATA,
  HANDLE_REMOVE_DATA,
} = require("../../../utils/constants");

const ShowStudents = () => {
  const [items, setItems] = useState([]);

  // Request saved data from renderer->main
  useEffect(() => {
    loadSavedData();
  }, []);

  // Response for the saved data request from main.js
  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_DATA, handleReceivedData);

    return () => {
      ipcRenderer.removeListener(HANDLE_FETCH_DATA, handleReceivedData);
    };
  });

  useEffect(() => {
    ipcRenderer.on(HANDLE_REMOVE_DATA, handleReceivedData);

    return () => {
      ipcRenderer.removeListener(HANDLE_REMOVE_DATA, handleReceivedData);
    };
  });

  const handleReceivedData = (_, data) => {
    setItems([...data.message]);
  };
  const calcAge = (age) => {
    const birthYear = age.split("-")[0];
    const date = new Date();
    const year = date.getFullYear();
    return year - birthYear;
  };

  const handleDelete = (item) => {
    removeDataFromStorage(item);
    // console.log(item);
  };

  return (
    <div className="">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">Show Students</li>
      </ol>

      {/* showStudents component */}
      <i className="bx bxs-show addIcon"></i>
      <h4 className="addTitle">Show Students</h4>
      <div className="container mt-4"></div>
      {/* =============== */}
      <table className="table table-hover">
        <thead className="table-info">
          <tr>
            <th scope="col">St_ID</th>
            <th scope="col">St_Name</th>
            <th scope="col">St_Email</th>
            <th scope="col">St_DOB</th>
            <th scope="col">St_Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="showAllStudentsTable">
          {items.map((item, i) => {
            return (
              <tr className="table-default" key={i + 1}>
                <th scope="row">{item.index}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.dob}</td>
                <td>{calcAge(item.dob)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item)}
                  >
                    <i className="bx bxs-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowStudents;
