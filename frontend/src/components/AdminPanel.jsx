import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import axios from "axios";
import {
  Container,
  Grid,
  Header,
  Card,
  Icon,
  Button,
  Image,
  Modal,
  Dropdown,
} from "semantic-ui-react";
import Link from "./Link";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
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
          key: uniqid(),
          value: e.username,
          role: e.role,
          district: e.district,
        }))
      );
    })();
  }, []);

  const deleteBtn = async () => {
    console.log("usuwam");
    window.location.reload(false);
    const response = await axios.get("http://localhost:5000/api/1/users", {
      username: "kamildudek",
    });
  };

  const modifyBtn = () => {
    console.log("dodaje");
  };

  return (
    <>
      <Grid columns={2}>
        <Grid.Column>
          <Header size="small" inverted className="form-header">
            Lista kurierów
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Container textAlign="right">
            <Button icon labelPosition="right">
              <Icon name="arrow right" />
              <Link href="/add-user">Dodaj użytkownika</Link>
            </Button>
          </Container>
        </Grid.Column>
      </Grid>

      <Grid stackable>
        <Grid.Row columns={3}>
          {users.map((user) => (
            <Grid.Column style={{ margin: "0.5em 0" }} stretched key={user.key}>
              <Card.Group>
                <Card>
                  <Card.Content>
                    <Card.Header content={user.value} />
                    <Card.Meta content={"Stanowisko: " + user.role} />
                    <Card.Description content={"Dzielnica: " + user.district} />
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button color="green">Modyfikuj</Button>}
                      >
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content image>
                          <Image
                            size="medium"
                            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                            wrapped
                          />
                          <Modal.Description>
                            <Header>Wybierz dzielnicę</Header>
                            <Dropdown
                              placeholder="Select Country"
                              fluid
                              search
                              selection
                              options={options}
                            />
                          </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color="black" onClick={() => setOpen(false)}>
                            Nope
                          </Button>
                          <Button
                            content="Yep, that's me"
                            labelPosition="right"
                            icon="checkmark"
                            onClick={() => setOpen(false)}
                            positive
                          />
                        </Modal.Actions>
                      </Modal>

                      <Button color="red" onClick={deleteBtn}>
                        Usuń
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminPanel;
