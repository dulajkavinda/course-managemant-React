import React, { Component } from "react";
import axios from "axios";
import Blog from "./Blog";

class BlogList extends Component {
  constructor(props) {
    super();
    this.state = {
      blogs: []
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:3000/api/blog/all")
      .then(res => {
        this.setState({ blogs: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  blogList() {
    return this.state.blogs.map((blogs, index) => {
      return <Blog blog={blogs} key={index} />;
    });
  }

  render() {
    return (
      <div>
        <h4>Blog Management</h4>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Summary</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{this.blogList()}</tbody>
        </table>
      </div>
    );
  }
}

export default BlogList;
