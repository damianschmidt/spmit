import React, { useEffect, useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Checkbox, Grid, Header } from "semantic-ui-react";

const LockerList = ({ lockers, setLockers }) => {
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

  const handleChange = (e, { value, checked }) => {
    if (checked) {
      setLockers([...lockers, { text: value, id: uniqid() }]);
    } else {
      setLockers(lockers.filter((e) => e.text !== value));
    }
  };

  return (
    <>
      <Header size="small" inverted className="form-header">
        Lista paczkomatów
      </Header>
      <Grid>
        <Grid.Row columns={3}>
          {options.map((option) => (
            <Grid.Column key={option.key}>
              <Checkbox
                value={option.value}
                label={option.text}
                onChange={handleChange}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default LockerList;
