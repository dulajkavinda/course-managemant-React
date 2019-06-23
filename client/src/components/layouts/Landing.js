import React, { Component } from "react";
import Slider from "./Slider";
import Info from "./Info";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Slider />
        <Info />
      </div>
    );
  }
}
