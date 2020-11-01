import React, { useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";

const Logout = () => {
  useEffect(() => {
    localStorage.setItem("isLogged", "");
    window.location.pathname = "/";
  }, []);

  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      container
      className="login-grid"
    >
      <Grid.Column className="login-grid-column">
        <Header inverted as="h2">
          ...Logout
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default Logout;
