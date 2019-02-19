import React, { Component } from "react";
import {
  Select,
  // Container,
  Input,
  Form,
  Button,
  Loader
} from "semantic-ui-react";
import Search from "../components/reusable/Search";
import styled from "styled-components";
import IndexWrapper from "../components/IndexWrapper";
import axios from "axios";
import Translations from "./translations";
import NavBar from "../components/navbar";
import { languages } from "../lib/languageData";

const Message = styled.div`
  background-color: #62cfc1;
  border-radius: 4px;
  position: relative;
  padding: 22px;
  color: #fff;
  margin: 33px 0;
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    right: 30px;
    bottom: -30px;
    border-left: 30px solid transparent;
    border-right: 10px solid transparent;
    border-top: 30px solid #62cfc1;
  }
`;

const Container = styled.div`
  margin-left: 6em;
  margin-right: 6em;
  margin-top: 6em;

  .grid-container-1 {
    display: grid;
    grid-template-areas:
      "message1 message1 message1 message2 message2 message2"
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
      padding: 5px 20px;
    }
    select {
      height: 100%;
      width: 100%;
      font-size: 2em;
    }
    position: fixed;
    z-index: 10;
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

export default class Index extends Component {
  state = {
    msg: "",
    lang: "en",
    history: []
  };

  async componentDidMount() {
    for (let i = 0; i < 10000; i++) {
      setTimeout(async () => {
        const rawData = await axios.get(`/api/chatHistory/${this.state.lang}`);
        const data = await rawData.data;
        console.log(data);
        this.setState(prevState => {
          window.scrollTo(0, document.documentElement.scrollHeight);
          return { ...prevState, history: data };
        });
      }, 3000 * i);
    }
  }
  getLanguageArr = () => {
    let arr = [];
    Object.keys(languages).forEach(lan => {
      arr.push({
        key: lan,
        description: languages[lan].name,
        title: languages[lan].name + " (" + languages[lan].nativeName + ")",
        val: lan
      });
    });
    return arr;
  };

  sendMsg = () => {
    this.setState(prevState => {
      const sendMessage = axios.post("/api/sendMessage", {
        chat: this.state.msg
      });
      return { msg: "" };
    });
  };

  render() {
    return (
      <div>
        <Container>
          <div class="grid-container-2 action input">
            <select onChange={e => this.setState({ lang: e.target.value })}>
              {this.getLanguageArr().map(lang => {
                return <option value={lang.val}>{lang.title}</option>;
              })}
            </select>
            <textarea
              value={this.state.msg}
              name="language"
              onChange={e => this.setState({ msg: e.target.value })}
              class="messageBody"
            />
            <button
              type="submit"
              class="ui send button"
              onClick={() => this.sendMsg()}
            >
              Send
            </button>
          </div>
        </Container>
        <Container>
          {this.state.history.map((h, i) => {
            return (
              <Message key={i}>
                <h1>{h}</h1>
              </Message>
            );
          })}
        </Container>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
