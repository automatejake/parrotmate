import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
import { FlexBox } from "../components/reusable/styles";
import Search from "../components/reusable/Search";
import { languages } from "../lib/languageData";

const LevelCard = styled.div`
  border: 4px solid ${props => props.theme[props.color]};
  border-radius: 8px;
  color: ${props => props.theme[props.color]};
  position: relative;
  margin: 20px 0px;
  transition: all 0.5s;
  cursor: pointer;
  .level-head {
    padding: 15px 20px 15px 60px;
    font-size: 80px;
  }
  .icon {
    float: right;
  }
  &:hover {
    background-color: ${props => props.theme[props.color]};
    color: white;
  }
  .ui.icon {
    font-size: 15px;
  }
`;

const levelCourses = [
  {
    level: "easy",
    color: "GREEN",
    icon: (
      <span className="icon">
        <Icon name="circle" />
        <Icon name="circle outline" />
        <Icon name="circle outline" />
        <Icon name="circle outline" />
      </span>
    )
  },
  {
    level: "medium",
    color: "BLUE",
    icon: (
      <span className="icon">
        <Icon name="circle" />
        <Icon name="circle" />
        <Icon name="circle outline" />
        <Icon name="circle outline" />
      </span>
    )
  },
  {
    level: "hard",
    color: "RED",
    icon: (
      <span className="icon">
        <Icon name="circle" />
        <Icon name="circle" />
        <Icon name="circle" />
        <Icon name="circle outline" />
      </span>
    )
  },
  {
    level: "expert",
    color: "BLACK",
    icon: (
      <span className="icon">
        <Icon name="circle" />
        <Icon name="circle" />
        <Icon name="circle" />
        <Icon name="circle" />
      </span>
    )
  }
];

const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
  .text-center {
    text-align: center;
  }
  h1 {
    font-size: 28px;
  }
  min-height: 100vh;
`;
const Stretch = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .text-center {
    text-align: center;
  }
`;

class Study extends Component {
  state = {
    lang: ""
  };
  showLevels = () => {
    return levelCourses.map(l => {
      return (
        <Link
          href={{
            query: {
              level: l.level,
              lang: this.state.lang
            },
            pathname: "/learn"
          }}
          key={l.level}
        >
          <LevelCard color={l.color}>
            <h1 className="level-head">
              {l.level.substring(0, 1).toUpperCase() + l.level.substring(1)}
              <span className="icon" />
              {l.icon}
            </h1>
          </LevelCard>
        </Link>
      );
    });
  };
  setLanguage = (name, value) => {
    this.setState({ [name]: value });
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
  render() {
    return (
      <Stretch>
        <Container>
          <FlexBox style={{ marginTop: "12px" }}>
            <h1 className="flex-2">
              <Icon name="language" /> &nbsp;&nbsp; Select Language
            </h1>
            <div className="flex-1">
              <Search
                name="lang"
                setValue={this.setLanguage}
                source={this.getLanguageArr()}
              />
            </div>
          </FlexBox>
          {this.state.lang !== "" ? (
            this.showLevels()
          ) : (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: "800px"
              }}
            >
              <h1
                className="text-center"
                style={{
                  fontSize: "50px"
                }}
              >
                Please Select Language to Study
              </h1>
            </div>
          )}
        </Container>
      </Stretch>
    );
  }
}

export default Study;

// Five Close-end, Five Multiple Choice.
