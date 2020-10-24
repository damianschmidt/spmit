import React, { useEffect, useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Form, Header, List } from "semantic-ui-react";
import Locker from "./Locker";

const LockerList = ({ lockers, setLockers }) => {
  const [options, setOptions] = useState([]);
  const [lockerName, setLockerName] = useState("");

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

  const handleChange = (e, { value }) => {
    setLockerName(value);
  };

  const handleClick = (e) => {
    if (lockerName) {
      setLockers([...lockers, { text: lockerName, id: uniqid() }]);
    }
    setLockerName("");
  };

  return (
    <>
      <Header size="small" inverted className="form-header">
        Lista paczkomatów
      </Header>

      <Form.Group widths="equal">
        <Form.Select
          search
          fluid
          options={options}
          placeholder="Wybierz paczkomat z listy"
          onChange={handleChange}
          value={lockerName}
        />
        <Form.Button type="button" positive onClick={handleClick}>
          Dodaj
        </Form.Button>
      </Form.Group>
      <List as="ol" inverted>
        {lockers.map((locker) => (
          <Locker
            locker={locker}
            key={locker.id}
            lockers={lockers}
            setLockers={setLockers}
          />
        ))}
      </List>
    </>
  );
};

export default LockerList;
