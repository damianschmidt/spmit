import React, { useState } from "react";
import { Accordion, Form, Icon, Segment } from "semantic-ui-react";
import Localization from "./Localization";
import LockerList from "./LockerList";

const RoadDetailsForm = () => {
  const [activeIndex, setActiveIndex] = useState(true);

  const handleClick = (e) => {
    setActiveIndex(!activeIndex);
  };

  return (
    <Segment inverted>
      <Accordion inverted>
        <Accordion.Title active={activeIndex} index={0} onClick={handleClick}>
          <Icon name="dropdown" />
          Formularz
        </Accordion.Title>
        <Accordion.Content active={activeIndex}>
          <Form inverted>
            <Localization />
            <LockerList />
            <Form.Button color="orange">Zapisz</Form.Button>
          </Form>
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
};

export default RoadDetailsForm;
