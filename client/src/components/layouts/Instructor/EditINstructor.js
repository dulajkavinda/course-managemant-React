import React, { Component } from "react";
import axios from "axios";
class EditINstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      education: "",
      year: "",
      subject: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:3000/api/instructor/get/" + this.props.match.params.id
      )
      .then(response => {
        console.log(response.data.name);

        this.setState({
          name: response.data.name,
          education: response.data.education,
          year: response.data.year,
          subject: response.data.year
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmit(e) {
    e.preventDefault();

    const newIns = {
      name: this.state.name,
      education: this.state.education,
      year: this.state.year,
      subject: this.state.subject
    };

    console.log(newIns);
    axios
      .put(
        "http://localhost:3000/api/instructor/update/" +
          this.props.match.params.id,
        newIns
      )
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err);
      });
    this.props.history.push("/inst/list");
  }
  render() {
    return (
      <div className="register" style={{ marginTop: "130px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add New Instructor</h1>
              <p className="lead text-center">Create a new BLOG to store</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Education"
                    name="education"
                    value={this.state.education}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Year"
                    name="year"
                    value={this.state.year}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Subject"
                    name="subject"
                    value={this.state.subject}
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
export default EditINstructor;
