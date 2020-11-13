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
  Modal,
  Dropdown,
  Form,
} from "semantic-ui-react";
import Link from "./Link";
import PackagesList from "./PackagesList";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);
  const [username, setUsername] = useState("");
  const [values] = useState({});
  const [district, setDistrict] = useState("");
  const [districtTable, setDistrictTable] = useState([]);

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

  const onChange = (event, result) => {
    const { value } = result || event.target;
    setDistrict(value);
  };
  const deleteBtn = async (key) => {
    users.forEach((e) => {
      if (e.key === key) {
        setUsername(e.value);
      }
    });
    window.location.reload();
    await axios("http://localhost:5000/api/1/users", {
      method: "DELETE",
      data: JSON.stringify({ username }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const modifyBtn = async () => {
    window.location.reload();
    await axios.put("http://localhost:5000/api/1/users", {
      username,
      update_dict: { district },
    });
  };

  const handleSubmit = (e, p) => {
    setUsername([...users].filter((e) => e.key === p.children.key)[0].value);
  };

  return (
    <>
      <Grid columns={2} stretched>
        <Grid.Column>
          <Header size="small" inverted className="form-header">
            Lista kurierów
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Container textAlign="right">
            <Link href="/add-user">
              <Button
                inverted
                color="orange"
                size={"tiny"}
                icon
                labelPosition="right"
              >
                <Icon name="add" />
                Dodaj użytkownika
              </Button>
            </Link>
          </Container>
        </Grid.Column>
      </Grid>
      <Grid stackable>
        <Grid.Row columns={3}>
          {users.map((user) => (
            <Form
              key={user.key}
              onSubmit={handleSubmit}
              className="form-admin-panel"
            >
              <Grid.Column
                className={"form-admin-panel grid-column"}
                stretched
                key={user.key}
              >
                <Card className="card-admin-panel">
                  <Card.Content>
                    <Card.Header
                      className="card-admin-panel header"
                      content={user.value}
                    />
                    <Card.Meta
                      className="card-admin-panel meta"
                      content={"Stanowisko: " + user.role}
                    />
                    <Card.Description
                      className="card-admin-panel description"
                      content={"Dzielnica: " + user.district}
                    />
                  </Card.Content>
                  <Card.Content className="package-list">
                    <PackagesList />
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Modal
                        closeIcon
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button color="orange">Modyfikuj</Button>}
                      >
                        <Modal.Header>Wybierz dzielnicę</Modal.Header>

                        <Modal.Description>
                          <Dropdown
                            placeholder="Dzielnica"
                            name="disctrict"
                            selection
                            fluid
                            onChange={onChange}
                            options={districtTable}
                            value={values.disctrict}
                          />
                        </Modal.Description>
                        <Modal.Actions>
                          <Button
                            content="Zapisz"
                            labelPosition="right"
                            icon="checkmark"
                            onClick={(() => setOpenDelModal(false), modifyBtn)}
                            color="orange"
                          />
                        </Modal.Actions>
                      </Modal>
                      <Modal
                        closeIcon
                        open={openDelModal}
                        trigger={<Button>Usuń</Button>}
                        onClose={() => setOpenDelModal(false)}
                        onOpen={() => setOpenDelModal(true)}
                      >
                        <Header>Usuń użytkownika: {username}</Header>
                        <Modal.Content>
                          <p>Czy jesteś pewien?</p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                            color="red"
                            onClick={() => setOpenDelModal(false)}
                          >
                            <Icon name="remove" /> Nie
                          </Button>
                          <Button
                            color="green"
                            onClick={(() => setOpenDelModal(false), deleteBtn)}
                          >
                            <Icon name="checkmark" /> Tak
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Form>
          ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminPanel;
