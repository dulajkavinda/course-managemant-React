import React, { Component } from "react";
import logo from "../../img/logo.png";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newAdmin = {
      name: "hello",
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post("http://localhost:5000/api/admin/register", newAdmin)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light" style={{ height: "100px" }}>
        <a className="navbar-brand" href="/">
          <img src={logo} width="330" height="80" alt="" />
        </a>
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-users" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="input-group ml-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="fas fa-key" />
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <button className="btn btn-warning my-2 my-sm-0 ml-2" type="submit">
            Login
          </button>
        </form>
      </nav>
    );
  }
}

export default Header;
