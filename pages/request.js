import React, { Component } from "react";
import axios from "axios";

export default class Request extends Component {
  state = {
    result: "waiting"
  };
  async componentDidMount() {
    const request = await axios.get("/api/test");
    const data = await request.data;
    this.setState({ result: data.test });
  }
  render() {
    return <div>{this.state.result}</div>;
  }
}
