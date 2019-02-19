import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import Link from 'next/link'
import Translations from '../pages/translations'


const IndexWrapper = props => {
  return (
    <div>
      <Sidebar>
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item as="a">Work</Menu.Item>
        <Menu.Item as="a">Company</Menu.Item>
        <Menu.Item as="a">Careers</Menu.Item>
        <Menu.Item as="a">Log in</Menu.Item>
        <Menu.Item as="a">Sign Up</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 350, padding: "1em 0em" }}
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item>
                <Icon name="sidebar" />
              </Menu.Item>
              <Menu.Item position="right">
                <Button href='../pages/translations'><a>Translate for Prizes!</a></Button>
                 
                {/* </Button> */}
              </Menu.Item>
              {/* <Menu.Item >
                <Button as="a" inverted>
                  Log in
                </Button>
                <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                  Sign Up
                </Button>
              </Menu.Item> */}
            </Menu>
          </Container>
          {props.children}
        </Segment>
      </Sidebar.Pusher>
    </div>
  );
};

export default IndexWrapper;
