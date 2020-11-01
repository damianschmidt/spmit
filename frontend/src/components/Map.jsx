import React, { useEffect, useRef } from "react";
import * as mapFn from "../utils/MapFunctions";

const Map = ({ waypoints, latitude, longtitude, lockersDetails }) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef(null);

  useEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;

    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "KHybn6-aTHe1xGe02p-W1kdCVsGqxpyfdcPEiUhXpnM",
    });

    const defaultLayers = platform.createDefaultLayers();

    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: latitude || 51.108, lng: longtitude || 17.04 },
      zoom: 13,
      pixelRatio: window.devicePixelRatio || 1,
    });

    new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    const ui = H.ui.UI.createDefault(hMap, defaultLayers, "pl-PL");

    const lockers = mapFn.lockersCoorinates(waypoints, lockersDetails);

    // Drawing route
    if (latitude & longtitude) {
      // Start point
      mapFn.displayMarker(platform, H, hMap, latitude, longtitude);

      // route for each locker
      let start = { lat: latitude, lng: longtitude };
      lockers.forEach((locker) => {
        mapFn.calculateRouteFromAtoB(platform, H, hMap, ui, start, locker);
        start = locker;
      });
    }

    // This will act as a cleanup to run once this hook runs again.
    return () => {
      hMap.dispose();
    };
  }, [mapRef, latitude, longtitude, waypoints, lockersDetails]);

  return (
    <div className="map here-map" ref={mapRef} style={{ height: "500px" }} />
  );
};

export default Map;
