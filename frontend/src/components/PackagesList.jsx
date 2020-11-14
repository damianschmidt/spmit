import React, { useEffect, useState } from "react";
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

const PackagesList = () => {
  const [open, setOpen] = useState(false);
  const [packages, setPackages] = useState([]);

  const setPackagesList = async () => {
    const list = await axios.get("http://localhost:5000/api/1/package_lists");
    setPackages(list.data);
  };

  useEffect(() => {
    setPackagesList();
  }, []);

  const handleSubmit = async (e) => {
    const file = e.target.elements[0].files[0];
    if (file && file.name.includes(".json")) {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("http://localhost:5000/api/1/package_lists", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPackagesList();
    }
  };

  const removePackage = async (e) => {
    const packageName =
      e.target.parentElement.previousElementSibling.textContent;
    await axios("http://localhost:5000/api/1/package_lists", {
      method: "DELETE",
      data: JSON.stringify({ name: packageName }),
      headers: { "Content-Type": "application/json" },
    });
    setPackagesList();
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
                    <Icon
                      name="delete"
                      onClick={removePackage}
                      className="delete-icon"
                    />
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
