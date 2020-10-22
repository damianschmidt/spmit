import React from "react";
import { Form, Segment } from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

class FormExampleSubcomponentControl extends React.Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <Segment inverted>
        <Form inverted>
          <Form.Group widths="equal">
            <Form.Input fluid label="First name" placeholder="First name" />
            <Form.Input fluid label="Last name" placeholder="Last name" />
            <Form.Select
              fluid
              label="Gender"
              options={options}
              placeholder="Gender"
            />
          </Form.Group>
          <Form.Group inline>
            <label>Size</label>
            <Form.Radio
              label="Small"
              value="sm"
              checked={value === "sm"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Medium"
              value="md"
              checked={value === "md"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Large"
              value="lg"
              checked={value === "lg"}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Button>Zapisz</Form.Button>
        </Form>
      </Segment>
    );
  }
}

export default FormExampleSubcomponentControl;
