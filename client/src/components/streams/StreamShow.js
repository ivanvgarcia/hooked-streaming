import React, { Component } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    await this.props.fetchStream(id);

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://www.localhost:8000/live/${id}.flv`
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
    this.player.play();
  }

  render() {
    if (!this.props.stream) {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      );
    }

    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <p>{description}</p>
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
)(StreamShow);
