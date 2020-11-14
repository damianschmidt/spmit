import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import Map from "./Map";

const RoadInfo = ({
  lockersDetails,
  lockersResultList,
  latitude,
  longtitude,
  lockersArr,
}) => {
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
  const formatText = (text) => {
    const road = text.join("").split(" ");
    road.forEach((element, index) => {
      if (element === "Cel") {
        road[index] = '<div class="destination">Cel';
      }
      if (element === "stronie.") {
        road[index] = "stronie.</div>";
      }
    });

    return road.join(" ").split(".").join(".<br />");
  };

  const showTravelTime = () =>
    lockersResultList.cost
      ? new Date(lockersResultList.cost * 1000).toISOString().substr(11, 8)
      : "";

  return (
    <Grid columns={2} inverted divided stackable reversed="mobile vertically">
      <Grid.Column width={6}>
        <Segment inverted className="road-info">
          <Header as="h4" icon="road" content="Szczegóły trasy" />
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
          <Map
            waypoints={lockersResultList.path}
            latitude={latitude}
            longtitude={longtitude}
            lockersDetails={lockersDetails}
          />
        ) : (
          <Map />
        )}
        <Segment inverted>
          Paczkomaty:
          {lockersArr.map((element, index) => (
            <span key={index}>
              <span key={index} className="lockers-list">{` ${element} `}</span>
              {lockersArr.length - 1 !== index ? (
                <Icon name="arrow right" />
              ) : (
                ""
              )}
            </span>
          ))}
        </Segment>
        <Segment inverted>
          Czas podróży: <span className="lockers-list">{showTravelTime()}</span>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default RoadInfo;
