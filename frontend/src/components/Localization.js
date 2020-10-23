import React, { useEffect, useState } from "react";
import { Checkbox, Form, Header, Segment } from "semantic-ui-react";

const Localization = () => {
  const [latitude, setlatitude] = useState("");
  const [longtitude, setlongtitude] = useState("");
  const [localizationErrorMessage, setlocalizationErrorMessage] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      function () {},
      (err) => setlocalizationErrorMessage(err.message)
    );
  }, []);

  const toggleStatus = (e) => {
    setCheckboxStatus(!checkboxStatus);
    if (!checkboxStatus) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          setlatitude(position.coords.latitude);
          setlongtitude(position.coords.longitude);
        },
        (err) => setlocalizationErrorMessage(err.message)
      );
    } else {
      setlatitude("");
      setlongtitude("");
    }
  };

  const renderCheckBox = () => {
    const message =
      "Automatyczna lokalizacja" +
      (localizationErrorMessage ? "niedostępna" : "");
    return (
      <>
        <Checkbox
          onChange={toggleStatus}
          label={message}
          disabled={!!localizationErrorMessage}
        />
      </>
    );
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
            placeholder={checkboxStatus ? longtitude : "..."}
            disabled={checkboxStatus}
          />
          <Form.Input
            fluid
            label="Szerokość geograficzna"
            placeholder={checkboxStatus ? latitude : "..."}
            disabled={checkboxStatus}
          />
        </Form.Group>
      </Segment>
    </>
  );
};

export default Localization;
