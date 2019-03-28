import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Modal } from "semantic-ui-react";
import history from "../history";

class ConfirmModal extends Component {
  state = { open: true };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => {
    this.setState({ open: false });
    history.push("/");
  };

  render() {
    const { open } = this.state;
    const { title, content, actions } = this.props;

    return ReactDOM.createPortal(
      <Modal dimmer={"blurring"} open={open} onClose={this.close}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Modal.Description>{content}</Modal.Description>
        </Modal.Content>
        <Modal.Actions>{actions}</Modal.Actions>
      </Modal>,
      document.querySelector("#modal")
    );
  }
}

export default ConfirmModal;
