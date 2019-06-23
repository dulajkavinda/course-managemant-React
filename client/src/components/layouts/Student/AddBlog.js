import React, { Component } from "react";
import axios from "axios";
class AddBlog extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      summary: "",
      description: ""
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

    const newBlog = {
      title: this.state.title,
      summary: this.state.summary,
      description: this.state.description
    };

    console.log(newBlog);
    axios
      .post("http://localhost:3000/api/blog/add", newBlog)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
    this.props.history.push("/student/list");
  }

  render() {
    return (
      <div className="register" style={{ marginTop: "130px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add New Blog</h1>
              <p className="lead text-center">Create a new BLOG to store</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Summary"
                    name="summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
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
export default AddBlog;
