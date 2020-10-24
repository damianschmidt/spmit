import React, { useEffect, useState } from "react";
import { Checkbox, Form, Header, Segment } from "semantic-ui-react";

const Localization = ({ latitude, setlatitude, longtitude, setlongtitude }) => {
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
      setlatitude(null);
      setlongtitude(null);
    }
  };

  const onInputChange = (e, { value, index }) => {
    if (index === 0) {
      setlongtitude(value);
    } else {
      setlatitude(value);
    }
  };

  const renderCheckBox = () => {
    const message =
      "Automatyczna lokalizacja" +
      (localizationErrorMessage ? "niedostępna" : "");
    return (
      <React.Fragment>
        <Checkbox
          onChange={toggleStatus}
          label={message}
          disabled={!!localizationErrorMessage}
        />
      </React.Fragment>
    );
  };

  return (
    <>
      <Header inverted size="small">
        Lokalizacja
      </Header>
      {renderCheckBox()}
      <Segment inverted className="localization-form">
        <Form.Group widths="equal">
          <Form.Input
            fluid
            required
            label="Długość geograficzna"
            placeholder={checkboxStatus ? longtitude : "..."}
            disabled={checkboxStatus}
            index={0}
            onChange={onInputChange}
          />
          <Form.Input
            fluid
            required
            label="Szerokość geograficzna"
            placeholder={checkboxStatus ? latitude : "..."}
            disabled={checkboxStatus}
            index={1}
            onChange={onInputChange}
          />
        </Form.Group>
      </Segment>
    </>
  );
};

export default Localization;
