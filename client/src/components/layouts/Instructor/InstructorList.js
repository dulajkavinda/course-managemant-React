import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Instructor from "./Instructor";

export default class InstructorList extends Component {
  constructor(props) {
    super();
    this.state = {
      instas: []
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:3000/api/instructor/all")
      .then(res => {
        console.log(res);
        this.setState({ instas: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  instaList() {
    return this.state.instas.map((instas, index) => {
      return <Instructor instructor={instas} key={index} />;
    });
  }

  render() {
    return (
      <div>
        <h4>Instructor Management</h4>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Education</th>
              <th>Year</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>{this.instaList()}</tbody>
        </table>
      </div>
    );
  }
}
