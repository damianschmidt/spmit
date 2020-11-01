import React, { useState, useEffect } from "react";
import axios from "axios";
import uniqid from "uniqid";
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
  const [district, setDistrict] = useState("");
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [dataErrorState, setDataErrorState] = useState(false);
  const [unfilledData, setUnfilledData] = useState(true);
  const [users, setUsers] = useState([]);
  const [districtTable, setDistrictTable] = useState([]);
  const [usernameIsTaken, setusernameIsTaken] = useState(false);
  const [values] = useState({});

  const onChange = (event, result) => {
    const { value } = result || event.target;
    setDistrict(value);
    setUnfilledData(false);
  };

  useEffect(() => {
    (async () => {
      const response_users = await axios.get(
        "http://localhost:5000/api/1/users",
        {}
      );
      setUsers(
        [...response_users.data].map((e) => ({
          username: e.username,
        }))
      );
      const response_district = await axios.get(
        "http://localhost:5000/api/1/lockers/districts",
        {}
      );
      setDistrictTable(
        [...response_district.data].map((e) => ({
          key: uniqid(),
          text: e,
          value: e,
        }))
      );
    })();
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
    if (index === 0) {
      setUsername(value);
      setusernameIsTaken(false);
      users.forEach((e) => {
        if (e.username === value) {
          setDataErrorState(true);
          setusernameIsTaken(true);
        } else if (usernameIsTaken) {
          setDataErrorState(false);
        }
      });
    } else if (index === 1) {
      setPassword(value);
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
              <Form.Dropdown
                placeholder="Dzielnica"
                name="disctrict"
                selection
                onChange={onChange}
                options={districtTable}
                value={values.disctrict}
              />
              <Message success>
                <Icon name="check" size="small" />
                Użytkownik został dodany!
              </Message>
              <Message error>
                <Icon name="times" size="small" />
                Nazwa użytkownika już jest zajęta!
              </Message>
              <Button
                disabled={dataErrorState || addSuccessfully || unfilledData}
                color="orange"
                fluid
                size="large"
              >
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
