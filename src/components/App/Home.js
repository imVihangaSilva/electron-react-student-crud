import React from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active">Home</li>
      </ol>
      <div className="jumbotron bg-success">
        <i className="bx bxs-bookmark-alt-minus" id="homeJumboTitleIcon"></i>
        <h2 className="homeJumboTitle">STUDENT MANAGEMENT SYSTEM</h2>
        <h5 className="homeJumboSubTitle">
          with Electron, React and Local Storage
        </h5>
        <hr />
        <p className="homeJumboPara">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem omnis inventore sed porro totam ipsum alias iure facere
          commodi, eveniet tempora necessitatibus, magnam minima, aliquid maxime
          dolor facilis? Non, minima.inventore sed porro totam ipsum alias iure
          facere commodi, eveniet tempora necessitatibus, magnam minima, aliquid
          maxime dolor facilis? Non, minima.inventore
        </p>
        <button className="btn btn-primary">
          <i className="bx bxl-github"></i>&nbsp;View on GitHub
        </button>
        &nbsp;
        <button className="btn btn-info">
          <i className="bx bxl-facebook-circle"></i>&nbsp;Facebook
        </button>
        &nbsp;
        <button className="btn btn-danger">
          <i className="bx bx-mail-send"></i>&nbsp;Send a Mail
        </button>
        <p className="homeJumboCredit">Application Build by @Vihanga Silva</p>
        <p className="homeJumboCredit2">
          ONEXTECH™ Solutions | All rights reserved @ 2021
        </p>
      </div>

      <div className="applicationOperations">
        <Link to="/addStudent">
          <button className="btn btn-warning">
            <i className="bx bxs-message-square-add"> </i>&nbsp; Add Student
          </button>
        </Link>
        &nbsp;
        <Link to="/showStudents">
          <button className="btn btn-success">
            <i className="bx bxs-show"></i>&nbsp; Show Student
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
