import React, {
  Component
} from "react";
import {
  Container,
  Image,
  Menu
} from "semantic-ui-react";
import logoImage from "../img/logo.png";

export class HeaderBar extends Component {
  render() {
    return ( <
      Menu inverted >
      <
      Container >
      <
      Menu.Item as = "a"
      header >
      <
      Image size = "mini"
      src = {
        logoImage
      }
      style = {
        {
          marginRight: "1.5em"
        }
      }
      />
      SPMiT <
      /Menu.Item> <
      /Container> <
      /Menu>
    );
  }
}

export default HeaderBar;