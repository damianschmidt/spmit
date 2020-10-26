import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./components/HeaderBar";
import RoadDetailForm from "./components/RoadDetailsForm";
import Route from "./components/Route";

const App = () => {
  const [lockersResultList, setLockersResultList] = useState({});

  return (
    <>
      <HeaderBar />
      <Route path="/">
        <Container>
          <RoadDetailForm setLockersResultList={setLockersResultList} />
          {/* for test only */}
          <h1 style={{ color: "white" }}>
            Odp:{JSON.stringify(lockersResultList)}
          </h1>
        </Container>
      </Route>
      <Route path="/login">
        <Container>
          <div>Here will be login panel</div>
        </Container>
      </Route>
    </>
  );
};

export default App;
