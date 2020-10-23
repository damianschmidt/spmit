import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import logoImage from "../img/logo.png";

const HeaderBar = () => {
  return (
    <Menu inverted>
      <Container>
        <Menu.Item as="a" header>
          <Image size="mini" src={logoImage} className="logo-img" />
          SPMiT
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default HeaderBar;
