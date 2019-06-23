import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentAdmin, logoutAdmin } from "./actions/authActions";

import store from "./store";

import Navbar from "./components/layouts/Navbar";
import Header from "./components/layouts/Header";
import Landing from "./components/layouts/Landing";
import Footer from "./components/layouts/Footer";

import AdminSidebar from "./components/layouts/Admin/AdminSidebar";
import AdminRegister from "./components/layouts/Admin/AdminRegister";
import AdminLogin from "./components/layouts/Admin/AdminLogin";
import AdminEdit from "./components/layouts/Admin/AdminEdit";
import AdminList from "./components/layouts/Admin/AdminList";

import StudentSidebar from "./components/layouts/Student/StudentSidebar";
import AddBlog from "./components/layouts/Student/AddBlog";
import BlogList from "./components/layouts/Student/BlogList";
import EditBlog from "./components/layouts/Student/EditBlog";

import InstructeNav from "./components/layouts/Instructor/AdminSidebar";
import AddInstructor from "./components/layouts/Instructor/AddInstructor";
import InstructorList from "./components/layouts/Instructor/InstructorList";
import InstructorEdit from "./components/layouts/Instructor/EditINstructor";

import AddCourse from "./components/layouts/Course/AddCourse";
import CourseList from "./components/layouts/Course/courseList";
import CourseEdit from "./components/layouts/Course/EditCourse";

import AddStudent from "./components/layouts/Student/AddStudent";

import "./App.css";

// check for token

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and authenticate
  store.dispatch(setCurrentAdmin(decoded));
  // check for expired tokens
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutAdmin());
    //redirect to login
    window.location.href = "/admin-login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="wrapper">
              <Route exact path="/" component={Header} />
              <Route exact path="/" component={Navbar} />
              <Route exact path="/" component={Landing} />
            </div>

            <Route exact path="/" component={Footer} />
            <div className="admin-wrapper">
              <Route path="/admin" component={AdminSidebar} />
              <Route exact path="/admin/register" component={AdminRegister} />
              <Route exact path="/admin-login" component={AdminLogin} />
              <Route exact path="/admin/edit/:id" component={AdminEdit} />
              <Route exact path="/admin/list" component={AdminList} />

              <Route path="/student" component={StudentSidebar} />
              <Route exact path="/addstudent" component={AddStudent} />
              <Route exact path="/student/addblog" component={AddBlog} />
              <Route exact path="/student/list" component={BlogList} />
              <Route exact path="/student/editblog/:id" component={EditBlog} />

              <Route path="/inst" component={AdminSidebar} />
              <Route exact path="/inst/add" component={AddInstructor} />
              <Route exact path="/inst/list" component={InstructorList} />
              <Route exact path="/inst/edit/:id" component={InstructorEdit} />

              <Route path="/course" component={AdminSidebar} />
              <Route exact path="/course/add" component={AddCourse} />
              <Route exact path="/course/list" component={CourseList} />
              <Route exact path="/course/edit/:id" component={CourseEdit} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
