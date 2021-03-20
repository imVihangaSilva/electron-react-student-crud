import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { saveDataInStorage } from "../../renderer";
const { ipcRenderer } = require("electron");
const {
  HANDLE_SAVE_DATA,
  HANDLE_ALREADY_EXSITS,
} = require("../../../utils/constants");

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [index, setIndex] = useState("");
  const [items, setItems] = useState([]);
  const [expressState, setExpressState] = useState(false);
  const [expressSuccess, setExpressSucess] = useState(false);
  const [expressWarning, setExpressWarning] = useState(false);
  const [expressMessage, setMessage] = useState("");
  // ============================================================

  const handleIndex = (e) => {
    setIndex(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleDob = (e) => {
    setDob(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (index !== "" && name !== "") {
      const data = { name: name, email: email, dob: dob, index: index };
      // this data value goes to be saved
      addItem(data);

      setName("");
      setIndex("");
      setEmail("");
      setDob("");
    } else {
      setExpressWarning(true);
    }
  };

  const addItem = (item) => {
    // console.log("React triggered with item : ", item);
    saveDataInStorage(item);
  };
  useEffect(() => {
    ipcRenderer.on(HANDLE_SAVE_DATA, handleSaveData);
    return () => {
      ipcRenderer.removeListener(HANDLE_SAVE_DATA, handleSaveData);
    };
  });

  const handleSaveData = (event, data) => {
    // console.log("Data saved : ", data.message);
    setItems([...items, data.message]);
    setExpressState(false);
    setExpressWarning(false);
    setExpressSucess(true);
  };

  useEffect(() => {
    ipcRenderer.on(HANDLE_ALREADY_EXSITS, handleAlreadyExsits);
    return () => {
      ipcRenderer.removeListener(HANDLE_ALREADY_EXSITS, handleAlreadyExsits);
    };
  });

  const handleAlreadyExsits = (event, data) => {
    setExpressSucess(false);
    setExpressWarning(false);
    setExpressState(true);
    setMessage(data.message);
  };

  // ============================================================
  return (
    <div className="">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">Add Students</li>
      </ol>

      {/* addStudent component */}
      <i className="bx bxs-message-square-add addIcon"></i>
      <h4 className="addTitle">Add New Student</h4>
      <div className="container mt-4">
        {expressState && (
          <div className="alert alert-danger">{expressMessage}</div>
        )}
        {expressSuccess && (
          <div className="alert alert-success">Successfully Added</div>
        )}
        {expressWarning && (
          <div className="alert alert-warning">
            Please fill ID Or Name Fields
          </div>
        )}

        <form>
          <div className="form-group">
            <label htmlFor="indexNo">Index No.</label>
            <input
              type="text"
              className="form-control"
              id="indexNo"
              placeholder="Enter student index here."
              onChange={handleIndex}
              value={index}
              required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              placeholder="Enter student name here."
              onChange={handleName}
              value={name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentEmail">Student Email</label>
            <input
              type="email"
              className="form-control"
              id="studentEmail"
              placeholder="Enter student email."
              onChange={handleEmail}
              value={email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentDob">Student Birthday</label>
            <input
              type="date"
              className="form-control"
              id="studentDob"
              onChange={handleDob}
              value={dob}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Add Student
          </button>
        </form>
      </div>
      {/* ************* */}
    </div>
  );
};

export default AddStudent;
