import React from "react";

const Map = ({ waypoints, latitude, longtitude }) => {
  const formatWaypoints = (waypoints) => {
    if (waypoints) {
      return waypoints.filter((e) => !e.includes("courier")).join("|");
    }
    return "";
  };
  return (
    <div>
      {formatWaypoints(waypoints)}
      <iframe
        title="gMap"
        width="600"
        height="550"
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCN82XdbT5tFDaM_BQt6lv4mFbG8vHvSXE
        &origin=${latitude},${longtitude}
        &waypoints=${formatWaypoints(waypoints)}
        &destination=${latitude},${longtitude}
        &avoid=tolls`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;
