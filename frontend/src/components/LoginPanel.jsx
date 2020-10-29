import React, { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onButtonSubmit = async (e) => {
    const response = await axios.post(
      "http://localhost:5000/api/1/users/login",
      {
        username,
        password,
      }
    );

    if (response.data) {
      window.location.pathname = "/";
    } else {
      window.alert("Błedne dane!");
    }
  };

  const onInputChange = (e, { value, index }) => {
    if (index === 0) {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <Grid
      className="login-grid"
      textAlign="center"
      verticalAlign="middle"
      container
    >
      <Grid.Column className="login-grid-column">
        <Header as="h2" className="login-header">
          Zaloguj się
        </Header>
        <Form size="large" inverted onSubmit={onButtonSubmit}>
          <Segment stacked inverted>
            <Form.Input
              fluid
              required
              icon="user"
              iconPosition="left"
              placeholder="Nazwa użytkownika"
              index={0}
              onChange={onInputChange}
            />
            <Form.Input
              fluid
              required
              icon="lock"
              iconPosition="left"
              placeholder="Hasło"
              type="password"
              index={1}
              onChange={onInputChange}
            />
            <Button color="orange" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
export default LoginForm;
