import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Header, Segment } from "semantic-ui-react";
import Map from "./Map";

const RoadInfo = ({ lockersResultList, latitude, longtitude }) => {
  const [roadInfo, setRoadInfo] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios.post(
        "http://localhost:5000/api/1/here_api/directions",
        {
          path: lockersResultList.path || [""],
          courier_latitude: latitude || 51.09907,
          courier_longitude: longtitude || 17.02758,
        }
      );
      setRoadInfo(response.data);
    })();
  }, [lockersResultList, latitude, longtitude]);

  // split text on single sentences and insert new line sign
  const formatText = (text) => text.join("").split(".").join(".<br />");

  return (
    <Grid columns={2} inverted divided stackable reversed="mobile vertically">
      <Grid.Column width={6}>
        <Segment inverted className="road-info">
          <Header as="h4" icon="road" content="Road Details" />
          {[...roadInfo].map((e, index) => {
            return (
              <div key={index}>
                <span
                  dangerouslySetInnerHTML={{ __html: formatText(e) }}
                ></span>
                <br />
              </div>
            );
          })}
        </Segment>
      </Grid.Column>
      <Grid.Column width={10}>
        {latitude && longtitude ? (
          <Map latitude={latitude} longtitude={longtitude} />
        ) : (
          <div>Mapa</div>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default RoadInfo;
