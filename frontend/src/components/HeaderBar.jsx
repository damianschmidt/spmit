import React, { useEffect, useState } from "react";
import { Button, Container, Image, Menu } from "semantic-ui-react";
import logoImage from "../img/logo.png";
import Link from "./Link";

const HeaderBar = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!!localStorage.getItem("isLogged")) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, []);

  return (
    <Menu inverted>
      <Container>
        <Link href="/" isActive={isActive}>
          <Image size="mini" src={logoImage} className="logo-img" />
          SPMiT
        </Link>
        <Link href="/" class="menu-mobile" isActive={isActive}>
          Strona Główna
        </Link>
        {!!localStorage.getItem("isLogged") ? (
          <>
            {localStorage.getItem("role") === "admin" ? (
              <Link href="/admin">Admin</Link>
            ) : (
              ""
            )}
            <Menu.Item position="right" className="menu-header">
              <Menu.Item
                className="menu-mobile menu-header header-link"
                as="a"
                active
              >
                {localStorage.getItem("name")}
              </Menu.Item>
              <Button as="a" inverted href="/logout">
                Wyloguj
              </Button>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item position="right" className="menu-header">
              <Button as="a" inverted href="/login">
                Zaloguj
              </Button>
            </Menu.Item>
          </>
        )}
      </Container>
    </Menu>
  );
};

export default HeaderBar;
