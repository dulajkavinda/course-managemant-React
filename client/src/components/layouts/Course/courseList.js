import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Course from "./Course";

export default class courseList extends Component {
  constructor(props) {
    super();
    this.state = {
      courses: []
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:3000/api/course/all")
      .then(res => {
        console.log(res);
        this.setState({ courses: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  courseList() {
    return this.state.courses.map((courses, index) => {
      return <Course course={courses} key={index} />;
    });
  }

  render() {
    return (
      <div>
        <h4>Course Management</h4>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>{this.courseList()}</tbody>
        </table>
      </div>
    );
  }
}
