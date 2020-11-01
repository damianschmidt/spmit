import React, { useEffect, useState } from "react";
import { Label, List } from "semantic-ui-react";

const User = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo({
      name: localStorage.getItem("name"),
      role: localStorage.getItem("role"),
      distr: localStorage.getItem("district"),
    });
  }, []);

  return (
    <List inverted divided selection>
      <List.Item>
        <Label color="red" horizontal>
          Imię
        </Label>
        {userInfo.name}
      </List.Item>
      <List.Item>
        <Label color="purple" horizontal>
          Rola
        </Label>
        {userInfo.role}
      </List.Item>
      <List.Item>
        <Label horizontal>Strefa</Label>
        {userInfo.distr}
      </List.Item>
    </List>
  );
};

export default User;
