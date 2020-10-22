import React from "react";
import { Checkbox, Form, Header, Segment } from "semantic-ui-react";

export class Localization extends React.Component {
  state = { lat: 0, lon: 0, errorMessage: "", status: true };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  toggleStatus = (e) => {
    this.setState({ status: !this.state.status });
  };

  render() {
    return (
      <div>
        <Header inverted size="small">
          Lokalizacja
        </Header>
        <Checkbox
          onChange={this.toggleStatus}
          label="Automatyczna lokalizacja"
          defaultChecked
        />
        <Segment inverted>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Długość geograficzna"
              placeholder="..."
              value={this.state.lon}
              disabled={this.state.status}
            />
            <Form.Input
              fluid
              label="Szerokość geograficzna"
              placeholder="..."
              value={this.state.lat}
              disabled={this.state.status}
            />
          </Form.Group>
        </Segment>
      </div>
    );
  }
}

export default Localization;
