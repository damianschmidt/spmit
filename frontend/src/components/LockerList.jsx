import React, { useEffect, useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Form, Header, List } from "semantic-ui-react";

const LockerList = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "http://localhost:5000/api/1/lockers",
        {}
      );

      setOptions(
        [...response.data].map((e) => ({
          key: uniqid(),
          text: e.name,
          value: e.name,
        }))
      );
    })();
  }, []);

  return (
    <>
      <Header size="small" inverted className="form-header">
        Lista paczkomatów
      </Header>

      <Form.Group widths="equal">
        <Form.Select
          fluid
          options={options}
          placeholder="Wybierz paczkomat z listy"
        />
        <Form.Button positive>Dodaj</Form.Button>
      </Form.Group>
      <List as="ol" inverted>
        lista
      </List>
    </>
  );
};

export default LockerList;
