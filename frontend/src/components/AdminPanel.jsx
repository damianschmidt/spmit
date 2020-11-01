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
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

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

  const deleteBtn = async (key) => {
    users.forEach((e) => {
      if (e.key == key) {
        setUsername(e.value);
      }
    });

    // window.location.reload(false);
    const response = await axios.delete("http://localhost:5000/api/1/users", {
      username: username,
    });
    console.log(response.data);
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
              <Card>
                <h1>{user.key}</h1>
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
                      trigger={
                        <Button key={user.key} color="green">
                          Modyfikuj
                        </Button>
                      }
                    >
                      <Modal.Header>Wybierz dzielnicę</Modal.Header>

                      <Modal.Description>
                        <Dropdown
                          placeholder="Wybierz dzielnicę"
                          fluid
                          search
                          selection
                          options={users}
                        />
                      </Modal.Description>
                      <Modal.Actions>
                        <Button
                          content="Zapisz"
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
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminPanel;
