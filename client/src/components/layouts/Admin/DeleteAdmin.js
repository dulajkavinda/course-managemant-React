import React, { Component } from "react";
import axios from "axios";
export default class DeleteAdmin extends Component {
  constructor(props) {
    super(props);
    axios
      .delete(
        "http://localhost:3000/api/admin/delete/" + this.props.match.params.id
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    return (
      <div>
        <h1>Deleted</h1>
      </div>
    );
  }
}
