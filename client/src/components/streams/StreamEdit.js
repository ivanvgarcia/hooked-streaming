import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions/index";

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <h1>StreamEdit</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamEdit);
