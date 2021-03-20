import React from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";

import AddStudent from "../pages/AddStudent";
import ShowStudents from "../pages/showStudents";
import Home from "./Home";
import { useState } from "react";

const NavBar = () => {
  const [toggleState, setToggle] = useState("d-flex toggled");
  const [iconState, setIcon] = useState("bx bx-menu");
  const [overlayState, setOverlay] = useState("nonOverlay");
  const [wrapperState, setWrapperState] = useState("");

  const handleToggle = (e) => {
    e.preventDefault();
    if (toggleState === "d-flex toggled") {
      setToggle("d-flex");
      setIcon("");
      setOverlay("overlay");
      setWrapperState("wrapperToggled");
    } else {
      setToggle("d-flex toggled");
      setIcon("bx bx-menu");
      setOverlay("nonOverlay");
      setWrapperState("");
    }
  };

  const handleOverlayClick = (e) => {
    if (overlayState !== "nonOverlay") {
      handleToggle(e);
    }
  };

  return (
    <HashRouter>
      <div className="App">
        <div className={overlayState} onClick={handleOverlayClick}>
          <div className={toggleState} id="wrapper">
            <div
              className="bg-primary navbar-dark text-white"
              id="sidebar-wrapper"
            >
              <div className="sidebar-heading">
                <button className="btn" id="menu-toggle" onClick={handleToggle}>
                  <i className="bx bxs-x-circle" id="close-sidebar"></i>
                </button>
              </div>
              <div className="list-group list-group-flush" id="sideBarNav">
                <Link
                  to="/"
                  className="list-group-item list-group-item-action text-light bg-primary"
                >
                  <i className="bx bxs-home"></i>&nbsp;&nbsp;&nbsp;Home
                </Link>
                <Link
                  to="/showStudents"
                  className="list-group-item list-group-item-action text-light active bg-primary"
                >
                  <i className="bx bxs-group"></i>&nbsp;&nbsp;&nbsp;Show All
                  Student
                </Link>
                <Link
                  to="/addStudent"
                  className="list-group-item list-group-item-action text-light bg-primary"
                >
                  <i className="bx bxs-user-plus"></i>&nbsp;&nbsp;&nbsp;Add
                  Student
                </Link>
              </div>
            </div>

            <div id="page-content-wrapper" className={wrapperState}>
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary m-0">
                <button className="btn" id="menu-toggle" onClick={handleToggle}>
                  <i className={iconState}></i>
                </button>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/">
                        Home <span className="sr-only">(current)</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <div className="container-fluid mt-2">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/addStudent" component={AddStudent} />
                  <Route exact path="/showStudents" component={ShowStudents} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HashRouter>
  );
};

export default NavBar;
