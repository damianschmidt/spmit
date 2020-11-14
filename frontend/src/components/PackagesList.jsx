import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  List,
  Modal,
} from "semantic-ui-react";

const packages = [
  "pn_9_11.json",
  "wt_10_11.json",
  "sr_11_11.json",
  "cz_12_11.json",
  "pt_13_11.json",
];

const PackagesList = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    const file = e.target.elements[0].files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(
      "http://localhost:5000/api/1/package_lists",
      formData,
      {
        // You need to use `getHeaders()` in Node.js because Axios doesn't
        // automatically set the multipart form boundary in Node.
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res);
  };

  return (
    <div>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <span>
            Lista paczek <Icon name="clipboard list" />
          </span>
        }
      >
        <Modal.Header>Lista paczek</Modal.Header>
        <div className="package-list-content">
          <List as="ol">
            {packages.map((e, key) => (
              <List.Item as="li" key={key}>
                <div className="package-order-li">
                  <div className="package-order-li-name">{e}</div>
                  <div className="package-order-li-icon">
                    <Icon name="delete" color="orange" />
                  </div>
                </div>
              </List.Item>
            ))}
          </List>
          <Form onSubmit={handleSubmit}>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Modal.Description>
                  <Input fluid type="file" accept=".json" />
                </Modal.Description>
              </Grid.Column>
              <Grid.Column width={6}>
                <Modal.Actions>
                  <Button content="Dodaj" icon="plus" color="orange" />
                </Modal.Actions>
              </Grid.Column>
            </Grid>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default PackagesList;
