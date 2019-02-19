import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
import { FlexBox } from "../components/reusable/styles";
import Search from "../components/reusable/Search";
import { languages } from "../lib/languageData";
import link from "next/link";
import NavBar from "../components/navbar";

const Container = styled.div`
  margin: 0 auto;
  position: fixed;
  min-height: 100vh;
  .text-center {
    text-align: center;
  }

  width: 100%;
  height: 100%;
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;

  @-webkit-keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @-moz-keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Header = styled.div`
  text-align: center;
  font-size: 100px;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Buttons = styled.div`
  margin-top: 1em;
  text-align: center;
  font-size: 8em;
  font-weight: bold;
  color: white;
  .button {
    padding: 2em;
    width: 10em;
  }
`;

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Container>
          <Header>
            Parrot Mate
            <img src="https://img.icons8.com/color/48/000000/parrot.png" />
          </Header>
          {/* */}
          <Buttons>
            <div class="ui buttons">
              <a href="study" class="ui violet button">
                Study
              </a>
              <a href="/" class="ui purple button">
                Chat
              </a>
              <a href="translations" class="ui pink button">
                Teach
              </a>
            </div>
          </Buttons>
        </Container>
      </div>
    );
  }
}

export default Home;
