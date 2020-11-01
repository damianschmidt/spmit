import React, { useEffect, useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Grid, Header } from "semantic-ui-react";
import CheckboxBtn from "./CheckboxBtn";

const LockerList = ({ lockers, setLockers, setLockersDetails }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:5000/api/1/lockers/${localStorage.getItem(
          "district"
        )}`,
        {}
      );

      setLockersDetails(response.data);

      setOptions(
        [...response.data].map((e) => ({
          key: uniqid(),
          text: e.name,
          value: e.name,
        }))
      );
    })();
  }, [setLockersDetails]);

  return (
    <>
      <Header size="small" inverted className="form-header">
        Lista paczkomatów
      </Header>
      <Grid>
        <Grid.Row columns={3}>
          {options.map((option) => (
            <Grid.Column computer={3} tablet={4} mobile={8} key={option.key}>
              <CheckboxBtn
                value={option.value}
                lockers={lockers}
                setLockers={setLockers}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default LockerList;
