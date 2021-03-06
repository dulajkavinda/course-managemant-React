import React, { Component } from "react";

class AdminSidebar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ color: "white" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link active" id="nav-first-child" href="/admin">
                <b>ADMIN PANNEL</b> <span className="sr-only">(current)</span>
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="/"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Instructor
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/inst/add">
                  Add New Instructor
                </a>
                <a className="dropdown-item" href="/admin/list">
                  Manage Instructor
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default AdminSidebar;
