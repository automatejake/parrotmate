import React, { Component } from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";
import { languages } from "../lib/languageData";
import { FlexBox } from "../components/reusable/styles";
import axios from "axios";

const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  .text-center {
    text-align: center;
  }
`;

const Head = styled.div`
  position: absolute;
  border: 1px solid black;
  width: 240px;
  display: inline-block;
  border-bottom: none;

  box-shadow: ${props =>
    props.shadowOn ? `1px -2px 3px rgba(0,0,0,0.3)` : `none`};
  border-top-left-radius: 3px;
  border-top-right-radius: 15px;
  background-color: white;
  z-index: ${props => props.zIndex};
  top: 20px;
  left: ${props => props.left || 0};
  background-color: ${props => props.theme[props.back]};
  cursor: pointer;
`;

const Note = styled.div`
  width: 100%;
  border: 1px solid black;
  position: absolute;
  top: 61px;
  background-color:${props =>
    props.theme[props.on === 0 ? "WHITEYELLOW" : "WHITEOLIVE"]}
  .note-label {
    padding: 30px;
    line-height: 0px;
  }
  input,select {
    width: 100%;
  }
`;

class CardComponent extends React.Component {
  state = {
    edit: false,
    input: this.props.helped[0] || ""
  };
  handleEdit = async () => {
    if (this.state.edit) {
      this.setState(prevState => {
        return { ...prevState, edit: false };
      });

      const raw = await axios.post("/api/help/edit/" + this.props.id, {
        input: this.state.input
      });
      const data = await raw.data;
      this.props.refetch();
    } else {
      this.setState({ edit: true });
    }
  };
  render() {
    return (
      <Card>
        <div className="header">
          <FlexBox>
            <div className="flex-1 text-center" style={{ fontWeight: "bold" }}>
              From : {getMyLanguage(this.props.from)}
            </div>
            <div className="flex-1 text-center">
              To : {getMyLanguage(this.props.to)}
            </div>
          </FlexBox>
          <h1>{this.props.word}</h1>
          <div>
            {this.state.edit ? (
              <textarea
                style={{ width: "100%", height: "100px" }}
                value={this.state.input}
                onChange={e => this.setState({ input: e.target.value })}
              />
            ) : this.props.helped.length !== 0 ? (
              this.props.helped[this.props.helped.length - 1]
            ) : null}
          </div>
          <div className="actions">
            <Icon name="heart" size="large" id="heart" />
            <Icon name="meh" size="large" id="meh" />
            <Icon
              name="pencil"
              size="large"
              id="pencil"
              onClick={() => this.handleEdit()}
            />
            <Icon name="comment" size="large" id="comment" />
            &nbsp;
          </div>
        </div>
      </Card>
    );
  }
}

const getMyLanguage = name => {
  if (name === "" || !name) return "";
  return languages[name].name + "(" + languages[name].nativeName + ")";
};

const Card = styled.div`
  border: 1px solid black;
  width: 80%;
  margin: 30px auto;
  height: 300px;
  .header {
    padding: 30px 20px;
  }
  .actions {
    float: right;
    #heart {
      transition: 0.5s;
      cursor: pointer;
    }
    #heart:hover {
      color: ${props => props.theme.RED};
    }
    #meh {
      transition: 0.5s;
      cursor: pointer;
    }
    #meh:hover {
      color: ${props => props.theme.BROWN};
    }
    #comment {
      transition: 0.5s;
      cursor: pointer;
    }
    #comment:hover {
      color: ${props => props.theme.YELLOW};
    }
    #pencil {
      transition: 0.5s;
      cursor: pointer;
    }
    #pencil:hover {
      color: ${props => props.theme.PINK};
    }
  }
`;

class Help extends Component {
  state = {
    on: 0,
    word: "",
    to: "",
    from: "",
    helps: []
  };
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
  fetchHelps = async () => {
    const raw = await axios.get("/api/help");
    const data = await raw.data;
    this.setState(prevState => {
      return {
        ...prevState,
        helps: data
      };
    });
  };
  showNote = on => {
    switch (on) {
      case 0:
        return (
          <React.Fragment>
            <FlexBox>
              <div className="flex-1">
                <h2 className="note-label">Word & Phrases</h2>
              </div>
              <div className="flex-2" style={{ padding: "12px" }}>
                <input
                  value={this.state.word}
                  onChange={e => {
                    this.setState({ word: e.target.value });
                  }}
                />
              </div>
            </FlexBox>
            <FlexBox>
              <div className="flex-1">
                <h2 className="note-label">From </h2>
              </div>
              <div className="flex-2" style={{ padding: "12px" }}>
                <select onChange={e => this.setState({ from: e.target.value })}>
                  {this.getLanguageArr().map(lang => {
                    return <option value={lang.val}>{lang.title}</option>;
                  })}
                </select>
              </div>
            </FlexBox>
            <FlexBox>
              <div className="flex-1">
                <h2 className="note-label">To </h2>
              </div>
              <div className="flex-2" style={{ padding: "12px" }}>
                <select onChange={e => this.setState({ to: e.target.value })}>
                  {this.getLanguageArr().map(lang => {
                    return <option value={lang.val}>{lang.title}</option>;
                  })}
                </select>
              </div>
            </FlexBox>
            <div style={{ padding: "30px" }}>
              <Button
                fluid
                onClick={() => {
                  this.setState({ on: 1 });
                  axios.post("/api/help", {
                    to: this.state.to,
                    from: this.state.from,
                    word: this.state.word
                  });
                }}
              >
                Ask
              </Button>
            </div>
          </React.Fragment>
        );
      case 1:
        return (
          <div>
            {this.state.helps.map(help => {
              return (
                <CardComponent
                  key={help._id}
                  id={help._id}
                  from={help.from}
                  to={help.to}
                  word={help.word}
                  helped={help.helped}
                  refetch={this.fetchHelps}
                />
              );
            })}
          </div>
        );
    }
  };
  render() {
    return (
      <Container>
        <Head
          onClick={() => this.setState({ on: 0 })}
          shadowOn={this.state.on === 0}
          zIndex={this.state.on === 0 ? 100 : 1}
          back={"WHITEYELLOW"}
        >
          &nbsp;&nbsp;&nbsp;Ask Us
        </Head>
        <Head
          shadowOn={this.state.on === 1}
          onClick={() => {
            this.setState({ on: 1 });
            this.fetchHelps();
          }}
          style={{ marginLeft: "-10px" }}
          back={"WHITEOLIVE"}
          zIndex={this.state.on === 0 ? 1 : 100}
          left={"235px"}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;Help Us
        </Head>
        <Note on={this.state.on}>{this.showNote(this.state.on)}</Note>
      </Container>
    );
  }
}

export default Help;
