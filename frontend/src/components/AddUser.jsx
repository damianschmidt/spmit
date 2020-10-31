import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Icon,
  Message,
} from "semantic-ui-react";
import Link from "./Link";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [district, setDistrict] = useState("");
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [dataErrorState, setDataErrorState] = useState(false);
  console.log(addSuccessfully);
  const onButtonSubmit = async () => {
    const response = await axios.post("http://localhost:5000/api/1/users", {
      username,
      password,
      role,
      district,
    });

    if (response.data) {
      setAddSuccessfully(true);
    } else {
      setDataErrorState(true);
    }
  };

  const onInputChange = (e, { value, index }) => {
    if (index === 0) {
      setUsername(value);
    } else if (index == 1) {
      setPassword(value);
    } else if (index == 2) {
      setRole(value);
    } else if (index == 3) {
      setDistrict(value);
    }
  };

  return (
    <>
      <Button icon labelPosition="left">
        <Icon name="arrow left" />
        <Link href="/admin">Powrót</Link>
      </Button>
      <Grid
        className="login-grid"
        textAlign="center"
        verticalAlign="middle"
        container
      >
        <Grid.Column className="login-grid-column">
          <Header size="small" inverted className="form-header">
            Dodaj użytkownika
          </Header>

          <Form
            inverted
            size="large"
            success={addSuccessfully}
            error={dataErrorState}
            inverted
            onSubmit={onButtonSubmit}
          >
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
              <Form.Input
                fluid
                required
                icon="id badge"
                iconPosition="left"
                placeholder="Stanowisko"
                index={2}
                onChange={onInputChange}
              />
              <Form.Input
                fluid
                required
                icon="map"
                iconPosition="left"
                placeholder="Dzielnica"
                index={3}
                onChange={onInputChange}
              />
              <Message success>
                <Icon name="check" size="small" />
                Użytkownik został dodany!
              </Message>
              <Message error>
                <Icon name="times" size="small" />
                Coś poszło nie tak!
              </Message>
              <Button color="orange" fluid size="large">
                Dodaj użytkownika
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default AddUser;
