import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Admin from "./Admin";

export default class AdminList extends Component {
  constructor(props) {
    super();
    this.state = {
      admins: []
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:3000/api/admin/test")
      .then(res => {
        console.log(res);
        this.setState({ admins: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  adminList() {
    return this.state.admins.map((admins, index) => {
      return <Admin admin={admins} key={index} />;
    });
  }

  render() {
    return (
      <div>
        <h4>Admin Management</h4>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{this.adminList()}</tbody>
        </table>
      </div>
    );
  }
}
