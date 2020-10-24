import React from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./components/HeaderBar";
import RoadDetailForm from "./components/RoadDetailsForm";

function App() {
  return (
    <>
      <HeaderBar />
      <Container>
        <RoadDetailForm />
      </Container>
    </>
  );
}

export default App;