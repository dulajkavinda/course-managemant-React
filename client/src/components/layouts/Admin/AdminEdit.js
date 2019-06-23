import React, { Component } from "react";
import axios from "axios";
class AdminEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
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
      .get("http://localhost:3000/api/admin/get/" + this.props.match.params.id)
      .then(response => {
        console.log(response.data.name);

        this.setState({
          name: response.data.name,
          email: response.data.email,
          password: "",
          password2: ""
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
      email: this.state.email
    };

    console.log(newIns);
    axios
      .put(
        "http://localhost:3000/api/admin/update/" + this.props.match.params.id,
        newIns
      )
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err);
      });
    this.props.history.push("/admin/list");
  }
  render() {
    return (
      <div className="register" style={{ marginTop: "130px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Update Admin</h1>
              <p className="lead text-center">
                Update a Courseweb ADMIN account
              </p>
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
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
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

export default AdminEdit;
