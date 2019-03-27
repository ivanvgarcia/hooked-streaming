import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";
import GoogleAuth from "./GoogleAuth";

class Navbar extends Component {
  state = { activeItem: "hooked" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="large">
        <Menu.Item
          as={Link}
          to="/"
          name="hooked"
          active={activeItem === "hooked"}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          as={Link}
          to="/"
          name="All Streams"
          active={activeItem === "All Streams"}
          onClick={this.handleItemClick}
        />

        <Menu.Menu position="right">
          <Dropdown item text="Console">
            <Dropdown.Menu>
              <Dropdown.Item>PC</Dropdown.Item>
              <Dropdown.Item>Nintendo Switch</Dropdown.Item>
              <Dropdown.Item>PlayStation 4</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <GoogleAuth />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
