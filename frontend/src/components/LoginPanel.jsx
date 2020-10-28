import React, { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onButtonSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/1/users/login",
      {
        username: username,
        password: password,
      }
    );
    console.log(response);
  };

  const onInputChange = (e, { value, index }) => {
    if (index === 0) {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Zaloguj się
        </Header>
        <Form size="large" onSubmit={onButtonSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              required
              icon="user"
              iconPosition="left"
              placeholder="Username"
              index={0}
              onChange={onInputChange}
            />
            <Form.Input
              fluid
              required
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              index={1}
              onChange={onInputChange}
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
export default LoginForm;
