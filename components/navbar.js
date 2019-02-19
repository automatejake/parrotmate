import React, { Component } from "react";
import { Container, Segment, Sidebar, Icon } from "semantic-ui-react";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  background-color: #2185d0;
  height: 44px;
  position: fixed;
  top: 0;
  z-index: 1000;
  a {
    font-size: 21px;
    text-decoration: none;
    color: #fff;
    margin-right: 35px;
    transition: 0.5s all;
    cursor: pointer;
    padding: 1px 0;
  }
  a:hover {
    border: 1px solid white;
    border-left: none;
    border-right: none;
  }
  a:last-child {
    margin-right: 40px;
  }
  ul li {
    list-style: none;
    float: right;
    color: #fff;
    margin-right: 20px;
  }
  .menu {
    float: right;
  }
`;

const NavBar = props => {
  return (
    <Wrapper>
      <div className="menu">
        <Link href="/">
          <a>
            <Icon name="home" />
            Home
          </a>
        </Link>
        <Link href="chat">
          <a>
            <Icon name="rocketchat" />
            Chat WorldWide
          </a>
        </Link>
        <Link href="quiz">
          <a>
            <Icon name="bell outline" />
            Quiz
          </a>
        </Link>
        <Link href="help">
          <a>
            <Icon name="universal access" />
            Help
          </a>
        </Link>
      </div>
    </Wrapper>
  );
};

export default NavBar;
