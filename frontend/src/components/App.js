import React from "react";
import { Container } from "semantic-ui-react";
import unsplash from "../api/unsplash";
import HeaderBar from "./HeaderBar";
import RoadDetailForm from "./RoadDetailForm";

class App extends React.Component {
  state = { images: [] };

  onSearchSubmit = async (term) => {
    const response = await unsplash.get("/api/1/lockers/route", {
      lockers_list: ["WRO88M", "WRO911", "WRO33A"],
      courier_latitude: 51.0,
      courier_longitude: 17.0,
    });

    this.setState({ images: response.data.results });
  };

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
