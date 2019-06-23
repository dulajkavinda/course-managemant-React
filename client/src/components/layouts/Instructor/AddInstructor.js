import React, { Component } from "react";
import axios from "axios";

class AddInstructor extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      education: "",
      year: "",
      subject: "",
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

    const newIns = {
      name: this.state.name,
      email: this.state.email,
      education: this.state.education,
      year: this.state.year,
      subject: this.state.subject,
      password: this.state.password
    };

    console.log(newIns);
    axios
      .post("http://localhost:3000/api/instructor/add", newIns)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post("http://localhost:3000/api/sendmail/test", newIns)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });

    this.props.history.push("/inst/list");
  }

  render() {
    return (
      <div className="register" style={{ marginTop: "130px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add New Instructor</h1>
              <p className="lead text-center">Create Instructor profile</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Education"
                    name="education"
                    value={this.state.education}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Year"
                    name="year"
                    value={this.state.year}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Subject"
                    name="subject"
                    value={this.state.sub}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddInstructor;
