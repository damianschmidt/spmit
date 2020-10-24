import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./components/HeaderBar";
import RoadDetailForm from "./components/RoadDetailsForm";

const App = () => {
  const [lockersResultList, setLockersResultList] = useState({});

  return (
    <>
      <HeaderBar />
      <Container>
        <RoadDetailForm setLockersResultList={setLockersResultList} />
        {/* for test only */}
        <h1 style={{ color: "white" }}>
          Odp:{JSON.stringify(lockersResultList)}
        </h1>
      </Container>
    </>
  );
};

export default App;
