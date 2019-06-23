import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Course extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete(
        "http://localhost:3000/api/course/delete/" + this.props.course._id
      )
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
    window.location.reload();
  }
  render() {
    return (
      <tr>
        <td>{this.props.course.name}</td>
        <td>{this.props.course.code}</td>

        <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td>
        <td>
          <Link
            to={"/course/edit/" + this.props.course._id}
            className="btn btn-primary m-0"
            style={{ marginTop: 10, marginRight: 30 }}
          >
            Edit Course
          </Link>
        </td>
      </tr>
    );
  }
}

export default Course;
