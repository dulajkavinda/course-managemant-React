import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Instructor extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete(
        "http://localhost:3000/api/instructor/delete/" +
          this.props.instructor._id
      )
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
    window.location.reload();
  }
  render() {
    return (
      <tr>
        <td>{this.props.instructor.name}</td>
        <td>{this.props.instructor.education}</td>
        <td>{this.props.instructor.year}</td>
        <td>{this.props.instructor.subject}</td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td>
        <td>
          <Link
            to={"/inst/edit/" + this.props.instructor._id}
            className="btn btn-primary m-0"
            style={{ marginTop: 10, marginRight: 30 }}
          >
            Edit Instructor
          </Link>
        </td>
      </tr>
    );
  }
}

export default Instructor;
