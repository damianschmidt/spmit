import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import axios from "axios";
import { Container, Grid, Header, Card, Icon, Button } from "semantic-ui-react";
import Link from "./Link";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

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
            <Grid.Column
              style={{ margin: "0.5em 0" }}
              floated
              stretched
              key={user.key}
            >
              <Card.Group>
                <Card>
                  <Card.Content>
                    <Card.Header content={user.value} />
                    <Card.Meta content={"Stanowisko: " + user.role} />
                    <Card.Description content={"Dzielnica: " + user.district} />
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
