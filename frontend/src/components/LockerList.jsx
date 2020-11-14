import React, { useEffect, useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Dropdown, Grid, Header, Segment } from "semantic-ui-react";
import CheckboxBtn from "./CheckboxBtn";

const packages = [
  { text: "pn_9_11.json", value: "pn_9_11.json", key: "pn_9_11.json" },
  { text: "wt_10_11.json", value: "wt_10_11.json", key: "wt_10_11.json" },
  { text: "sr_11_11.json", value: "sr_11_11.json", key: "sr_11_11.json" },
  { text: "cz_12_11.json", value: "cz_12_11.json", key: "cz_12_11.json" },
  { text: "pt_13_11.json", value: "pt_13_11.json", key: "pt_13_11.json" },
];

const LockerList = ({ lockers, setLockers, setLockersDetails }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const district = !!localStorage.getItem("district")
        ? `/${localStorage.getItem("district")}`
        : "";

      const response = await axios.get(
        `http://localhost:5000/api/1/lockers${district}`,
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
        Lista paczkomatów: {localStorage.getItem("district")}
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

      <Header size="small" inverted>
        Wybierz paczkomaty automatycznie na podstawie listy
      </Header>
      <Segment inverted>
        <Dropdown placeholder="Paczki" search selection options={packages} />
      </Segment>
    </>
  );
};

export default LockerList;
