import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdmin } from "../../../actions/authActions";
import classnames from "classnames";
import logo from "../../../img/logo.png";
class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/admin");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newAdmin = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginAdmin(newAdmin);

    // axios
    //   .post("/api/admin/login", newAdmin)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     this.setState({
    //       errors: err.response.data
    //     });
    //   });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form onSubmit={this.onSubmit} style={{ marginTop: "230px" }}>
                <h1 className="display-4 text-center">
                  {" "}
                  <img src={logo} width="330" height="80" alt="" />
                </h1>

                <p className="lead text-center">
                  Sign in to your Courseweb Admin account
                </p>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
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

AdminLogin.protoTypes = {
  loginAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginAdmin }
)(AdminLogin);
