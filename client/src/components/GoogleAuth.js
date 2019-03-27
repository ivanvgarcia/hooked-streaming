import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "629341157285-40dc3a9b4dtvabct8vo5v3sbcc25u21c.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        })
        .catch(err => console.log(err));
    });
  }

  onAuthChange = isSignedIn => {
    isSignedIn
      ? this.props.signIn(this.auth.currentUser.get().getId())
      : this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <Menu.Item>
          <Button color="red" onClick={this.onSignOutClick}>
            <i className="google icon" />
            Log out
          </Button>
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item>
          <Button color="red" onClick={this.onSignInClick}>
            {" "}
            <i className="google icon" />
            Login with Google
          </Button>
        </Menu.Item>
      );
    }
  };

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn
});

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
