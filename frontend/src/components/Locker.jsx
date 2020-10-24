import React from "react";
import { Icon, List } from "semantic-ui-react";

const Locker = ({ locker, lockers, setLockers }) => {
  const onIconClick = (e) => {
    setLockers(lockers.filter((e) => e.id !== locker.id));
  };

  return (
    <List.Item as="li">
      {locker.text}
      <Icon name="delete" className="delete-icon" onClick={onIconClick} />
    </List.Item>
  );
};

export default Locker;
