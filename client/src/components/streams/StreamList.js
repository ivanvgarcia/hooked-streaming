import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
import { Button, Icon, Image, Item, Label } from "semantic-ui-react";

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <Item.Extra>
          <Button color="red" floated="right">
            Delete
            <Icon name="times" />
          </Button>
          <Button floated="right">
            Edit
            <Icon name="right chevron" />
          </Button>
        </Item.Extra>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <Item key={stream.id}>
          <Icon bordered inverted color="red" name="video" size="huge" />
          <Item.Content>
            <Item.Header>{stream.title}</Item.Header>
            <Item.Description>{stream.description}</Item.Description>
            {this.renderAdmin(stream)}
          </Item.Content>
        </Item>
      );
    });
  }

  renderCreate() {
    return (
      this.props.isSignedIn && (
        <Button as={Link} to="/streams/new" floated="right">
          Create Stream
        </Button>
      )
    );
  }

  render() {
    return (
      <div>
        <h1>Streams</h1>
        {this.renderCreate()}
        <Item.Group divided>{this.renderList()}</Item.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  streams: Object.values(state.streams),
  currentUserId: state.auth.userId,
  isSignedIn: state.auth.isSignedIn
});

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
