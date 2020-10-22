import React from "react";
import axios from "axios";
import { Accordion, Form, Icon, Segment } from "semantic-ui-react";
import Localization from "./Localization";

class FormExampleSubcomponentControl extends React.Component {
  state = { lockers: [], options: [], activeIndex: 0 };

  componentDidMount = async () => {
    const response = await axios.get("http://localhost:5000/api/1/lockers", {});

    this.setState({ lockers: response.data });
    this.state.lockers = this.state.lockers
      .map((elem) => {
        return { key: elem.name, text: elem.name, value: elem.name };
      })
      .forEach((e) => this.state.options.push(e));
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Segment.Group>
        <Segment inverted>
          <Accordion inverted>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              Formularz
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Form inverted>
                <Localization />
                <Form.Group widths="equal">
                  <Form.Select
                    fluid
                    label="Wybierz paczkomat z listy"
                    options={this.state.options}
                    placeholder="..."
                  />
                </Form.Group>
                <Form.Button>Zapisz</Form.Button>
              </Form>
            </Accordion.Content>
          </Accordion>
        </Segment>
      </Segment.Group>
    );
  }
}

export default FormExampleSubcomponentControl;
