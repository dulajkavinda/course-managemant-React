import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    axios
      .delete("http://localhost:3000/api/blog/delete/" + this.props.blog._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
    window.location.reload();
  }

  render() {
    return (
      <tr>
        <td>{this.props.blog.title}</td>
        <td>{this.props.blog.summary}</td>
        <td>{this.props.blog.description}</td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td>
        <td>
          <Link
            className="btn btn-success"
            to={"/student/editblog/" + this.props.blog._id}
          >
            Update
          </Link>
        </td>
      </tr>
    );
  }
}
