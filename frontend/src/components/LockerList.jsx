import React, { useEffect, useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Dropdown, Grid, Header, Segment } from "semantic-ui-react";
import CheckboxBtn from "./CheckboxBtn";

const LockerList = ({ lockers, setLockers, setLockersDetails }) => {
  const [options, setOptions] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    (async () => {
      const district = !!localStorage.getItem("district")
        ? `/${localStorage.getItem("district")}`
        : "";

      const response = await axios.get(
        `http://localhost:5000/api/1/lockers${district}`,
        {}
      );

      const userName =
        localStorage.getItem("name") === "admin"
          ? ""
          : `/${localStorage.getItem("name")}`;
      const list = await axios.get(
        `http://localhost:5000/api/1/package_lists${userName}`
      );
      setPackages(
        list.data.map((name, index) => ({
          text: name,
          value: name,
          key: index,
        }))
      );

      setLockersDetails(response.data);

      setOptions(
        [...response.data].map((e) => ({
          key: uniqid(),
          text: e.name,
          value: e.name,
          active: null,
        }))
      );
    })();
  }, [setLockersDetails]);

  const handleChange = async (e) => {
    const response = await axios.get(
      `http://localhost:5000/api/1/package_lists/list/${e.target.textContent}`
    );

    setOptions(
      options.map((e) => ({
        key: e.key,
        text: e.text,
        value: e.value,
        active: response.data.includes(e.text) ? e.value : null,
      }))
    );
  };

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
                active={option.active}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>

      <Header size="small" inverted>
        Wybierz paczkomaty automatycznie na podstawie listy
      </Header>
      <Segment inverted>
        <Dropdown
          placeholder="Paczki"
          search
          selection
          options={packages}
          onChange={handleChange}
        />
      </Segment>
    </>
  );
};

export default LockerList;
