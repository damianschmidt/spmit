import React from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./HeaderBar";
import RoadDetailForm from "./RoadDetailForm";

class App extends React.Component {
  render() {
    return (
      <>
        <HeaderBar />
        <Container>
          <RoadDetailForm />
        </Container>
      </>
    );
  }
}

export default App;
