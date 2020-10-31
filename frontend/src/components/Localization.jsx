import React, { useEffect, useState } from "react";
import { Checkbox, Form, Header, Message, Segment } from "semantic-ui-react";

const Localization = ({
  coordsIsValid,
  latitude,
  setLatitude,
  longtitude,
  setLongtitude,
}) => {
  const [localizationErrorMessage, setLocalizationErrorMessage] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      function () {},
      (err) => setLocalizationErrorMessage(err.message)
    );
  }, []);

  const toggleStatus = (e) => {
    setCheckboxStatus(!checkboxStatus);
    if (!checkboxStatus) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongtitude(position.coords.longitude);
        },
        (err) => setLocalizationErrorMessage(err.message)
      );
    } else {
      setLatitude(null);
      setLongtitude(null);
    }
  };

  const onInputChange = (e, { value, index }) => {
    if (index === 0) {
      setLongtitude(value);
    } else {
      setLatitude(value);
    }
  };

  const renderCheckBox = () => {
    const message =
      "Automatyczna lokalizacja" +
      (localizationErrorMessage ? " niedostępna" : "");
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
        <Message
          error={coordsIsValid}
          color="red"
          content="Proszę wpisać tylko cyfry"
        />
      </Segment>
    </>
  );
};

export default Localization;
