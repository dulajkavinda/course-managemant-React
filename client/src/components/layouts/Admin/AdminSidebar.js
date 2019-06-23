import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutAdmin } from "../../../actions/authActions";

class AdminSidebar extends Component {
  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutAdmin();
    this.props.history.push("/admin-login");
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/admin-login");
    }
  }

  render() {
    const { admin } = this.props.auth;
    console.log(admin);
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
                Admin
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/admin/register">
                  Add New Admin
                </a>
                <a className="dropdown-item" href="/admin/list">
                  Manage Admins
                </a>
              </div>
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
                Instructors
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/inst/add">
                  Add New Instructors
                </a>

                <a className="dropdown-item" href="/inst/list">
                  Manage Instructors
                </a>
                <div className="dropdown-divider" />
              </div>
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
                Courses
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/course/add">
                  Add New Courses
                </a>
                <a className="dropdown-item" href="/course/list">
                  Manage Courses
                </a>
              </div>
            </li>
          </ul>

          <ul className="navbar-nav ml-9">
            <li className="nav-item"> Welcome , {admin.name}</li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                onClick={this.onLogoutClick.bind(this)}
              >
                <img
                  className="rounded-circle"
                  src={admin.avatar}
                  alt={admin.name}
                  style={{ width: "45px", marginRight: "5px" }}
                />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

AdminSidebar.protoTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutAdmin }
)(AdminSidebar);
