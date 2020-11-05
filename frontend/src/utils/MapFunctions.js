function calculateRouteFromAtoB(platform, H, hMap, ui, start, end) {
  const router = platform.getRoutingService(null, 8);
  const routeRequestParams = {
    routingMode: "fast",
    transportMode: "car",
    origin: `${start.lat},${start.lng}`, // Brandenburg Gate
    destination: `${end.lat},${end.lng}`, // Friedrichstraße Railway Station
    return: "polyline,turnByTurnActions,actions,instructions,travelSummary",
  };

  router.calculateRoute(
    routeRequestParams,
    (result) => {
      const route = result.routes[0];
      addRouteShapeToMap(route, H, hMap);
      addManueversToMap(route, H, hMap, ui);
    },
    onError
  );
  addSVGMarkers(hMap, H, end);
}

function onError(error) {
  alert("Can't reach the remote server");
}

function openBubble(position, text, H, ui) {
  let bubble = null;
  if (!bubble) {
    bubble = new H.ui.InfoBubble(
      position,
      // The FO property holds the province name.
      { content: text }
    );
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}

function addRouteShapeToMap(route, H, hMap) {
  route.sections.forEach((section) => {
    // Create a linestring to use as a point source for the route line
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    // Create a polyline to display the route:
    let routeLine = new H.map.Polyline(linestring, {
      style: { strokeColor: "blue", lineWidth: 3 },
    });

    // Create a marker for the start point:
    let routeOutline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 5,
        strokeColor: "rgba(0, 128, 255, 0.7)",
        lineTailCap: "arrow-tail",
        lineHeadCap: "arrow-head",
      },
    });

    // Create a marker for the end point:
    let routeArrows = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 5,
        fillColor: "white",
        strokeColor: "rgba(255, 255, 255, 1)",
        lineDash: [0, 2],
        lineTailCap: "arrow-tail",
        lineHeadCap: "arrow-head",
      },
    });

    // Add the route polyline and the two markers to the map:
    hMap.addObjects([routeLine, routeOutline, routeArrows]);

    // Set the map's viewport to make the whole route visible:
    hMap.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
  });
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addManueversToMap(route, H, hMap, ui) {
  let svgMarkup =
      '<svg width="18" height="18" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="8" cy="8" r="4" ' +
      'fill="#1b468d" stroke="white" stroke-width="1"  />' +
      "</svg>",
    dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
    group = new H.map.Group(),
    i;
  route.sections.forEach((section) => {
    let poly = H.geo.LineString.fromFlexiblePolyline(
      section.polyline
    ).getLatLngAltArray();

    let actions = section.actions;
    // Add a marker for each maneuver
    for (i = 0; i < actions.length; i += 1) {
      let action = actions[i];
      const marker = new H.map.Marker(
        {
          lat: poly[action.offset * 3],
          lng: poly[action.offset * 3 + 1],
        },
        { icon: dotIcon }
      );
      marker.instruction = action.instruction;
      group.addObject(marker);
    }

    group.addEventListener(
      "tap",
      function (evt) {
        hMap.setCenter(evt.target.getGeometry());
        openBubble(evt.target.getGeometry(), evt.target.instruction, H, ui);
      },
      false
    );

    // Add the maneuvers group to the map
    hMap.addObject(group);
  });
}

function displayMarker(platform, H, hMap, latitude, longtitude) {
  const service = platform.getSearchService();
  service.reverseGeocode(
    {
      at: `${latitude},${longtitude}`,
    },
    (result) => {
      result.items.forEach((item) => {
        hMap.addObject(new H.map.Marker(item.position));
      });
    },
    alert
  );
}

function lockersCoorinates(waypoints, lockersDetails) {
  const lockers = [];
  if (lockersDetails) {
    waypoints.forEach((waypoint) => {
      const result = [...lockersDetails].filter((e) => e.name === waypoint);
      if (result.length !== 0) {
        lockers.push({
          lat: result[0].latitude,
          lng: result[0].longitude,
          name: result[0].name,
        });
      }
    });
  }
  return lockers;
}

function addSVGMarkers(map, H, locker) {
  if (locker.name === "") return;
  //Create the svg mark-up
  const name = [...locker.name]
    .filter(
      (e) => (e !== "W") & (e !== "R") & (e !== "O") & (e !== "P") & (e !== "-")
    )
    .join("");

  const svgMarkup =
    '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="black" fill="FILL" x="1" y="1" width="22" height="22" />' +
    '<text x="12" y="18" font-size="7pt" font-family="Arial" font-weight="bold" ' +
    'text-anchor="middle" fill="STROKE" >' +
    name +
    "</text></svg>";

  // Add marker.
  const cubsIcon = new H.map.Icon(
      svgMarkup.replace("FILL", "white").replace("STROKE", "orange")
    ),
    cubsMarker = new H.map.Marker(
      { lat: locker.lat, lng: locker.lng },
      { icon: cubsIcon }
    );

  map.addObject(cubsMarker);
}
export { calculateRouteFromAtoB, displayMarker, lockersCoorinates };
