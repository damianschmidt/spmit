import React, { useState } from "react";
import { Accordion, Form, Icon, Message, Segment } from "semantic-ui-react";
import Localization from "./Localization";
import LockerList from "./LockerList";
import axios from "axios";

const RoadDetailsForm = ({
  setLockersResultList,
  setLatitude,
  setLongtitude,
}) => {
  const [activeIndex, setActiveIndex] = useState(true);
  const [lockers, setLockers] = useState([]);
  const [lockerErrorState, setLockerErrorState] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const handleClick = (e) => {
    setActiveIndex(!activeIndex);
  };

  const onButtonSubmit = async (e) => {
    e.preventDefault();

    if (lockers.length === 0) {
      setLockerErrorState(true);
    } else {
      setLockerErrorState(false);
      const lockersArray = lockers.map((element) => element.text);

      const response = await axios.post(
        "http://localhost:5000/api/1/lockers/route",
        {
          lockers_list: lockersArray,
          courier_latitude: 51.0,
          courier_longitude: 17.0,
        }
      );

      setLockersResultList(response.data);
      setLatitude(lat);
      setLongtitude(lng);

      setActiveIndex(!activeIndex);
    }
  };

  return (
    <Segment inverted>
      <Accordion inverted>
        <Accordion.Title active={activeIndex} index={0} onClick={handleClick}>
          <Icon name="dropdown" />
          Formularz
        </Accordion.Title>
        <Accordion.Content active={activeIndex}>
          <Form error={lockerErrorState} inverted onSubmit={onButtonSubmit}>
            <Localization
              latitude={lat}
              setLatitude={setLat}
              longtitude={lng}
              setLongtitude={setLng}
            />
            <LockerList lockers={lockers} setLockers={setLockers} />
            <Message
              error
              header="Nie wybrano żadnego paczkomatu"
              content="Proszę wybrać paczkomat z listy"
            />
            <Form.Button floated="right" color="orange" size="large">
              Zapisz
            </Form.Button>
            <div style={{ clear: "both" }}></div>
          </Form>
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
};

export default RoadDetailsForm;
