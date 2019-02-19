import React, { Component } from "react";
import { Select, Input, Form, Button, Loader } from "semantic-ui-react";
import axios from "axios";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 6em;
  margin-right: 6em;
  margin-top: 6em;

  .header {
    text-align: center;
    margin-top: 30px;
    font-size: 3em;
  }

  .originalMessage {
    grid-area: message1;
  }
  .nativePicker {
    grid-area: dropdown;
  }
  .messageBody {
    grid-area: body;
  }
  .send {
    grid-area: button;
  }

  .grid-container-1 {
    display: grid;
    grid-template-areas:
      "message1 message1 message1 message1 message1 message1"
      "dropdown body body body body button";
    grid-gap: 10px;
    background-color: #2196f3;
    padding: 10px;
  }

  .grid-container-1 > div {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
  }
  .grid-container-2 {
    border-radius: 20px;
    display: grid;
    grid-template-areas:
      "message1 message1 message1 message2 message2 message2"
      "dropdown body body body body button";
    grid-gap: 10px;
    background-color: #2196f3;
    padding: 10px;
    textarea {
      font-size: 2.5em;
      padding: 10px;
    }
    button {
      font-size: 2em;
    }
    select {
      height: 100%;
      width: 100%;
      font-size: 2em;
    }
    position: fixed;
    bottom: 0;
    margin-bottom: 1em;
    left: 50%;
    transform: translateX(-50%);
    /* text-align: center; */
    width: 1200px;
    height: 100px;
  }
  .grid-container-2 > div {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
  }
`;

//this component displays all the words and phrases waiting to be translated
class Translations extends Component {
  state = {
    awaitingWords: {}
  };

  renderAwaitingWords = () => {
    // var words = axios.get('/api/translations')
    // console.log(words[PromiseValue])
  };

  render() {
    return (
      <Container>
        <h1 class="header"> Help Improve Our Translations </h1>
        <div>
          <Container>
            <div class="grid-container-1">
              <div class="originalMessage">1</div>
            </div>
          </Container>
          <Container>
            <div class="grid-container-2">
              <select class="nativePicker ui dropdown">
                <option value="">English</option>
                <option value="1">Korean</option>
                <option value="0">Spanish</option>
              </select>
              <textarea class="messageBody" />
              <button class="ui send button">Send</button>
            </div>
          </Container>
        </div>
      </Container>
    );
  }
}

export default Translations;
