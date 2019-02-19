import React, { Component } from "react";
import styled from "styled-components";
import LearnComponent from "../components/learnComponent";

const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  .text-center {
    text-align: center;
  }
`;

class learn extends Component {
  state = {
    count: 0
  };
  componentDidMount() {
    for (let i = 1; i <= 11; i++) {
      setTimeout(() => {
        this.setState({ count: this.state.count + 1 });
      }, 7000 * i);
    }
  }
  render() {
    return (
      <Container>
        <LearnComponent count={this.state.count} />
      </Container>
    );
  }
}

export default learn;
