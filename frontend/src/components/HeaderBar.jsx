import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import logoImage from "../img/logo.png";
import Link from "./Link";

const HeaderBar = () => {
  return (
    <Menu inverted>
      <Container>
        <Link href="/">
          <Image size="mini" src={logoImage} className="logo-img" />
          SPMiT
        </Link>
        <Link href="/">Home</Link>
        {!!localStorage.getItem("isLogged") ? (
          <Link href="/logout">Logout</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </Container>
    </Menu>
  );
};

export default HeaderBar;
