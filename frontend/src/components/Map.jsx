import React, { useRef } from "react";

const Map = ({ waypoints, latitude, longtitude }) => {
  const mapRef = useRef(null);

  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "KHybn6-aTHe1xGe02p-W1kdCVsGqxpyfdcPEiUhXpnM",
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: latitude, lng: longtitude },
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1,
    });

    // Create the parameters for the routing request:
    var routingParameters = {
      routingMode: "fast",
      transportMode: "car",
      // The start point of the route:
      origin: `${latitude},${longtitude}`,

      via: "51.105449,17.027239",
      // The end point of the route:
      destination: `${latitude},${longtitude}`,
      // Include the route shape in the response
      return: "polyline",
    };

    // Define a callback function to process the routing response:
    const onResult = function (result) {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section) => {
          // Create a linestring to use as a point source for the route line
          let linestring = H.geo.LineString.fromFlexiblePolyline(
            section.polyline
          );

          // Create a polyline to display the route:
          let routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: "blue", lineWidth: 3 },
          });

          // Create a marker for the start point:
          let startMarker = new H.map.Marker(section.departure.place.location);

          // Create a marker for the end point:
          let endMarker = new H.map.Marker(section.arrival.place.location);

          // Add the route polyline and the two markers to the map:
          hMap.addObjects([routeLine, startMarker, endMarker]);

          // Set the map's viewport to make the whole route visible:
          hMap
            .getViewModel()
            .setLookAtData({ bounds: routeLine.getBoundingBox() });
        });
      }
    };

    const router = platform.getRoutingService(null, 8);

    router.calculateRoute(routingParameters, onResult, function (error) {
      alert(error.message);
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    return () => {
      hMap.dispose();
    };
  }, [mapRef]);

  return <div className="map" ref={mapRef} className="here-map" />;
};

export default Map;
