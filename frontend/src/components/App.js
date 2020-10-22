import React from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./HeaderBar";
import RoadDetailForm from "./RoadDetailForm";

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <Container>
          <RoadDetailForm />
        </Container>
      </div>
    );
  }
}

export default App;
