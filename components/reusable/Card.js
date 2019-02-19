import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";

class CardComponent extends Component {
  render() {
    return (
      <Card style={{ width: "100%" }}>
        <Card.Content>
          <Card.Header>{this.props.header}</Card.Header>
          <Card.Meta>{this.props.meta}</Card.Meta>
          <Card.Description>{this.props.desc}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

CardComponent.propTypes = {
  header: PropTypes.string,
  meta: PropTypes.string,
  desc: PropTypes.string
};

export default CardComponent;
