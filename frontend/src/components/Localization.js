import React, { useEffect, useState } from "react";
import { Checkbox, Form, Header, Segment } from "semantic-ui-react";

const Localization = () => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {},
      (err) => setErrorMessage(err.message)
    );
  }, []);

  const toggleStatus = (e) => {
    setStatus(!status);
    if (!status) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (err) => setErrorMessage(err.message)
      );
    } else {
      setLat("");
      setLon("");
    }
  };

  const renderCheckBox = () => {
    if (errorMessage) {
      return (
        <>
          <Checkbox
            onChange={toggleStatus}
            label="Automatyczna lokalizacja niedostępna"
            disabled={true}
          />
        </>
      );
    } else {
      return (
        <>
          <Checkbox
            onChange={toggleStatus}
            label="Automatyczna lokalizacja"
            disabled={false}
          />
        </>
      );
    }
  };

  return (
    <>
      <Header inverted size="small">
        Lokalizacja
      </Header>
      {renderCheckBox()}
      <Segment inverted style={{ margin: 0, paddingBottom: 0 }}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Długość geograficzna"
            placeholder={status ? lon : "..."}
            disabled={status}
          />
          <Form.Input
            fluid
            label="Szerokość geograficzna"
            placeholder={status ? lat : "..."}
            disabled={status}
          />
        </Form.Group>
      </Segment>
    </>
  );
};

export default Localization;
