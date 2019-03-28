import React, { Component } from "react";
import ConfirmModal from "../ConfirmModal";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions/index";
import history from "../../history";

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <>
        <Button
          onClick={() => this.props.deleteStream(id)}
          color="green"
          inverted
        >
          <Icon name="checkmark" /> Yes
        </Button>
        <Button as={Link} to="/" color="red" inverted>
          <Icon name="remove" /> No
        </Button>
      </>
    );
  }

  renderContent() {
    return !this.props.stream
      ? "Are you sure you want to delete this stream?"
      : `Are you sure you want to delete the stream with the title ${
          this.props.stream.title
        }?`;
  }

  render() {
    return (
      <>
        <ConfirmModal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => {
            history.push("/");
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
