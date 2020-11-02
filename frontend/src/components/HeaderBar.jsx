import React from "react";
import { Button, Container, Image, Menu } from "semantic-ui-react";
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
        <Link href="/" class="menu-mobile">
          Home
        </Link>
        {!!localStorage.getItem("isLogged") ? (
          <>
            {localStorage.getItem("role") === "admin" ? (
              <Link href="/admin">Admin</Link>
            ) : (
              ""
            )}
            <Menu.Item position="right" className="menu-header">
              <Menu.Item className="menu-mobile menu-header" as="a">
                {localStorage.getItem("name")}
              </Menu.Item>
              <Button as="a" inverted href="/logout">
                Logout
              </Button>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item position="right" className="menu-header">
              <Button as="a" inverted href="/login">
                Login
              </Button>
            </Menu.Item>
          </>
        )}
      </Container>
    </Menu>
  );
};

export default HeaderBar;
