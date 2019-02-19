import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { withRouter } from "next/router";
import axios from "axios";
import _ from "lodash";

const Ready = styled.div`
  font-size: 100px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute;
`;
const Progress = styled.div`
  background-color: ${props => props.theme.BLUE};
  width: ${props => (props.num / 7) * 100}%;
  height: 100%;
  transition: 0.9s;
`;

const ProgressBar = styled.div`
  height: 20px;
  width: 100%;
  border: 1px solid black;
  border-radius: 3px;
  margin-top: 15px;
`;

const ResultContainer = styled.div`
  .grid {
    display: grid;
    grid-template-columns: 3fr 3fr 1fr;
  }
  .item {
    border: 1px solid black;
    padding: 20px 0;
    font-size: 20px;
    text-align: center;
  }
`;

const MultipleChoiceStyle = styled.div`
  .question {
    position: absolute;
    left: 50%;
    top: 22%;
    transform: translate(-50%, -50%);
    min-width: 800px;
    font-size: 75px;
  }
  .options {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    width: 1100px;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50px;
  }
  .option {
    border: 1px solid #000;
    border-radius: 6px;
    text-align: center;
    padding: 30px;
    font-size: 40px;
    line-height: 50px;
    transition: 0.5s;
    cursor: pointer;
  }
  .option.selected {
    background-color: #aaa;
    color: #fff;
  }
  .option:hover {
    background-color: #aaa;
    color: #fff;
  }
`;

const CloseEndStyle = styled.div`
  font-size: 75px;
  position: absolute;
  top: 35%;
  left: 50%;
  min-width: 800px;
  line-height: 90px;
  text-align: center;
  transform: translate(-50%, -50%);
  input {
    margin-top: 30px;
    border: none;
    border-bottom: 2px solid black;
    text-align: center;
  }
  input:focus {
    outline: none;
  }
`;

const GetReady = () => {
  return <Ready>Get Ready</Ready>;
};

class LearnComponent extends Component {
  state = {
    num: 7,
    value: "",
    quizzes: [],
    answers: [],
    myAnswers: [],
    selectedOption: 0
  };
  ShowResultPage = props => {
    let cor = 0;
    for (let i = 0; i < 10; i++) {
      if (this.state.myAnswers[i]) {
        if (
          this.state.answers[i].toLowerCase().trim() ==
          this.state.myAnswers[i].toLowerCase().trim()
        )
          cor++;
      }
    }
    const renderResult = () => {
      let i = 0;
      axios.post("/api/saveResults", {
        answers: this.state.answers,
        submits: this.state.myAnswers,
        to: this.props.router.query.lang
      });
      return this.state.answers.map(g => {
        let ans = this.state.answers[i].toLowerCase().trim();
        let myAns = this.state.myAnswers[i]
          ? this.state.myAnswers[i].toLowerCase().trim()
          : "";
        i++;
        return (
          <React.Fragment>
            <div className="item">{ans}</div>
            <div className="item">{myAns}</div>
            <div className="item">
              {
                <Icon
                  name={ans === myAns ? "check" : "x"}
                  color={ans === myAns ? "green" : "red"}
                />
              }
            </div>
          </React.Fragment>
        );
      });
    };

    return (
      <ResultContainer>
        <h1>{cor}/10</h1>
        <div className="grid">
          <div className="item ">Correct Answer</div>
          <div className="item">Your Answer</div>
          <div className="item">C/W</div>
          {renderResult()}
        </div>
      </ResultContainer>
    );
  };
  CloseEnd = props => {
    return (
      <CloseEndStyle>
        <div>
          Q{this.props.count}.{" "}
          {this.state.quizzes.length !== 0
            ? this.state.quizzes[this.props.count - 1]
            : null}
        </div>
        <div>
          <input
            value={props.text}
            onChange={e => props.textChange("value", e.target.value)}
          />
        </div>
      </CloseEndStyle>
    );
  };
  MultipleChoice = props => {
    return (
      <MultipleChoiceStyle>
        <h1 className="question">
          Q{this.props.count}.{" "}
          {this.state.quizzes.length !== 0
            ? this.state.quizzes[this.props.count - 1]
            : null}
        </h1>
        <div className="options">
          <div
            className={`option ${
              this.state.selectedOption === 1 ? "selected" : ""
            }`}
            onClick={() =>
              this.setState({
                value: this.multipleChoiceArr[this.props.count - 6]
                  ? this.multipleChoiceArr[this.props.count - 6][0]
                  : null,
                selectedOption: 1
              })
            }
          >
            {this.multipleChoiceArr[this.props.count - 6]
              ? this.multipleChoiceArr[this.props.count - 6][0]
              : null}
          </div>
          <div
            className={`option ${
              this.state.selectedOption === 2 ? "selected" : ""
            }`}
            onClick={() =>
              this.setState({
                value: this.multipleChoiceArr[this.props.count - 6]
                  ? this.multipleChoiceArr[this.props.count - 6][1]
                  : null,
                selectedOption: 2
              })
            }
          >
            {this.multipleChoiceArr[this.props.count - 6]
              ? this.multipleChoiceArr[this.props.count - 6][1]
              : null}
          </div>
          <div
            className={`option ${
              this.state.selectedOption === 3 ? "selected" : ""
            }`}
            onClick={() =>
              this.setState({
                value: this.multipleChoiceArr[this.props.count - 6]
                  ? this.multipleChoiceArr[this.props.count - 6][2]
                  : null,
                selectedOption: 3
              })
            }
          >
            {this.multipleChoiceArr[this.props.count - 6]
              ? this.multipleChoiceArr[this.props.count - 6][2]
              : null}
          </div>
          <div
            className={`option ${
              this.state.selectedOption === 4 ? "selected" : ""
            }`}
            onClick={() =>
              this.setState({
                value: this.multipleChoiceArr[this.props.count - 6]
                  ? this.multipleChoiceArr[this.props.count - 6][3]
                  : null,
                selectedOption: 4
              })
            }
          >
            {this.multipleChoiceArr[this.props.count - 6]
              ? this.multipleChoiceArr[this.props.count - 6][3]
              : null}
          </div>
        </div>
      </MultipleChoiceStyle>
    );
  };
  renderQuestions = (text, textChange, answers) => {
    if (this.props.count <= 5 && this.props.count !== 0) {
      return (
        <this.CloseEnd
          textChange={textChange}
          text={text}
          number={this.props.count}
        />
      );
    } else if (this.props.count > 5 && this.props.count <= 10) {
      return <this.MultipleChoice answers={answers} />;
    } else if (this.props.count === 0) {
      return <GetReady />;
    } else {
      return <this.ShowResultPage />;
    }
  };
  async componentWillMount() {
    const raw = await axios.get(
      `/api/quiz/${this.props.router.query.level}/ 
        ${this.props.router.query.lang}`
    );
    const data = await raw.data;
    this.setState({ quizzes: data.translated, answers: data.answer });
    this.multipleChoiceArr = [];
    for (let i = 5; i <= 9; i++) {
      const ans = _.shuffle(data.answer);
      const index = ans.indexOf(data.answer[i]);
      const arr = [];
      arr.push(ans[index]);
      for (let j = 0; j < ans.length; j++) {
        if (j !== index) {
          arr.push(ans[j]);
        }
        if (arr.length === 4) {
          break;
        }
      }
      this.multipleChoiceArr.push(_.shuffle(arr));
    }
  }
  componentDidMount() {
    for (let i = 0; i <= 77; i++) {
      setTimeout(() => {
        if (i % 7 === 0) {
          this.setState(prevState => {
            let myAns = [...prevState.myAnswers];
            myAns[this.props.count - 1] = prevState.value;
            return {
              ...prevState,
              selectedOption: 0,
              value: "",
              myAnswers: myAns
            };
          });
        }
        this.setState({ num: 7 - (i % 7) });
      }, i * 1000);
    }
  }
  textChange = (name, value) => {
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        {this.props.count > 10 ? null : (
          <ProgressBar>
            <Progress num={this.state.num}>&nbsp;</Progress>
          </ProgressBar>
        )}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "40px"
          }}
        />
        {this.renderQuestions(
          this.state.value,
          this.textChange,
          this.state.answers
        )}
      </div>
    );
  }
}

export default withRouter(LearnComponent);
