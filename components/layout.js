import PropTypes from "prop-types";
import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Meta from "./hoc/Meta";
import NavBar from "../components/navbar";

const GlobalStyle = createGlobalStyle`
    html{
        box-sizing: border-box;
    }
    body{
        padding:0 !important;
        margin:0 !important;
        font-size: 1.5rem !important;
        line-height: 2 !important;
		font-family: 'Source Sans Pro' !important, sans-serif ;
    }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const theme = {
  RED: `#DB2828`,
  ORANGE: `#F2711C`,
  YELLOW: `#FBBD08`,
  OLIVE: `#B5CC18`,
  GREEN: "#21BA45",
  TEAL: "#00B5AD",
  BLUE: "#2185D0",
  VIOLET: "#6435C9",
  PURPLE: "#A333C8",
  PINK: "#E03997",
  BROWN: "#A5673F",
  GREY: "#767676",
  BLACK: "#1B1C1D",
  WHITE: "#fff",
  ORANGEYELLOW: "#F8B195",
  ORANGERED: "#F67280",
  DARKPINK: "#C06C84",
  DARKVIOLET: "#6C5B7B",
  YELLOWBLUE: "#355C7D",
  LIGHTBLACK: "#2A363B",
  WHITERED: "#FF8C94",
  WHITEORANGE: "#FFAAA6",
  WHITEYELLOW: "#FFD3B5",
  WHITEGREEN: "#DCEDC2",
  WHITEOLIVE: "#A8E6CE",
  VERYLIGHTBLUE: "#E7EFF6",
  LIGHTBLUE: "#ADCBE3",
  BLUE2: "#63ACE5",
  DARKORANGEBLUE: "#4B86B4"
};

const HomepageLayout = props => (
  <ThemeProvider theme={theme}>
    <Container>
      <NavBar />
      <div style={{ height: "44px" }}>&nbsp;</div>
      <GlobalStyle />
      <Meta />
      {props.children}
    </Container>
  </ThemeProvider>
);
export default HomepageLayout;
