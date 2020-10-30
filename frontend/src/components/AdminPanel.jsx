import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import axios from "axios";
import { Grid, Header, Card } from "semantic-ui-react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [hasError, setErrors] = useState(false);

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
      <Header size="small" inverted className="form-header">
        Lista kurierów
      </Header>
      <Grid>
        <Grid.Row columns={3}>
          {users.map((user) => (
            <Grid.Column computer={3} tablet={4} mobile={8} key={user.key}>
              <Card style={{ minWidth: "100vh" }}>
                <Card.Content header={user.value} />
                <Card.Content description={"Stanowisko: " + user.role} />
                <Card.Content description={"Dzielnica: " + user.district} />
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AdminPanel;
