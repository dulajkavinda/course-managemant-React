import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
    axios
      .delete("http://localhost:3000/api/admin/delete/" + this.props.admin._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
    window.location.reload();
  }
  render() {
    return (
      <tr>
        <td>{this.props.admin.name}</td>
        <td>{this.props.admin.email}</td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td>
        <td>
          <Link
            to={"/admin/edit/" + this.props.admin._id}
            className="btn btn-primary m-0"
            style={{ marginTop: 10, marginRight: 30 }}
          >
            Edit Admin
          </Link>
        </td>
      </tr>
    );
  }
}

export default Admin;
