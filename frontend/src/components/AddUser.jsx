import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Icon,
  Message,
  Dropdown,
  Input,
} from "semantic-ui-react";
import Link from "./Link";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState("");
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [dataErrorState, setDataErrorState] = useState(false);
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([
    { key: "af", value: "af", flag: "af", text: "Afghanistan" },
    { key: "ax", value: "ax", flag: "ax", text: "Aland Islands" },
    { key: "al", value: "al", flag: "al", text: "Albania" },
    { key: "dz", value: "dz", flag: "dz", text: "Algeria" },
    { key: "as", value: "as", flag: "as", text: "American Samoa" },
  ]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:5000/api/1/users", {});

      setUsers(
        [...response.data].map((e) => ({
          value: e.username,
        }))
      );
    })();
    console.log(setUsers);
  }, []);

  const onButtonSubmit = async () => {
    const response = await axios.post("http://localhost:5000/api/1/users", {
      username,
      password,
      role: "courier",
      district,
    });

    if (response.data) {
      setAddSuccessfully(true);
    } else {
      setDataErrorState(true);
    }
  };

  const onInputChange = (e, { value, index }) => {
    if (index === 0 && users.includes(value) == false) {
      setUsername(value);
    } else if (index == 1) {
      setPassword(value);
    } else if (index == 2) {
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
                icon="map"
                iconPosition="left"
                placeholder="Dzielnica"
                index={2}
                onChange={onInputChange}
              />
              {/* <Dropdown
                placeholder="Select Country"
                fluid
                search
                selection
                options={options}
              /> */}
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
