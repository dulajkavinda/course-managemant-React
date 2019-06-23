import React, { Component } from "react";
import axios from "axios";

class AddCourse extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      code: ""
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

    const newCOurse = {
      name: this.state.name,
      code: this.state.code
    };

    console.log(newCOurse);
    axios
      .post("http://localhost:3000/api/course/add", newCOurse)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
    this.props.history.push("/course/list");
  }

  render() {
    return (
      <div className="register" style={{ marginTop: "130px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add New Course</h1>
              <p className="lead text-center">Create a new Course</p>
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
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Code"
                    name="code"
                    value={this.state.code}
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
export default AddCourse;
