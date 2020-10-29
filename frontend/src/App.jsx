import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./components/HeaderBar";
import RoadDetailForm from "./components/RoadDetailsForm";
import Route from "./components/Route";
import RoadInfo from "./components/RoadInfo";
import LoginForm from "./components/LoginPanel";

const App = () => {
  const [latitude, setlatitude] = useState(null);
  const [longtitude, setlongtitude] = useState(null);
  const [lockersResultList, setLockersResultList] = useState({});

  return (
    <>
      <HeaderBar />
      <Route path="/">
        <Container>
          <RoadDetailForm
            setLockersResultList={setLockersResultList}
            latitude={latitude}
            longtitude={longtitude}
            setlatitude={setlatitude}
            setlongtitude={setlongtitude}
          />
          <RoadInfo
            lockersResultList={lockersResultList}
            latitude={latitude}
            longtitude={longtitude}
          />
        </Container>
      </Route>
      <Route path="/login">
        <Container>
          <LoginForm />
        </Container>
      </Route>
    </>
  );
};

export default App;
