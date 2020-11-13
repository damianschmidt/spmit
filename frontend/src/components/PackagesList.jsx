import React, { useState } from "react";
import { Button, Grid, Icon, Input, List, Modal } from "semantic-ui-react";

const packages = [
  "pn_9_11.json",
  "wt_10_11.json",
  "sr_11_11.json",
  "cz_12_11.json",
  "pt_13_11.json",
];

const PackagesList = () => {
  const [open, setOpen] = useState(false);

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
            {packages.map((e) => (
              <List.Item as="li">
                <div className="package-order-li">
                  <div className="package-order-li-name">{e}</div>
                  <div className="package-order-li-icon">
                    <Icon name="delete" color="orange" />
                  </div>
                </div>
              </List.Item>
            ))}
          </List>
          <Grid columns={2}>
            <Grid.Column width={10}>
              <Modal.Description>
                <Input fluid type="file" />
              </Modal.Description>
            </Grid.Column>
            <Grid.Column width={6}>
              <Modal.Actions>
                <Button content="Dodaj" icon="plus" color="orange" />
              </Modal.Actions>
            </Grid.Column>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

export default PackagesList;
