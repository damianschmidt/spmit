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
    // decode LineString from the flexible polyline
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    // Create a polyline to display the route:
    let polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 4,
        strokeColor: "rgba(0, 128, 255, 0.7)",
      },
    });

    // Add the polyline to the map
    hMap.addObject(polyline);
    // And zoom to its bounding rectangle
    hMap.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox(),
    });
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
      '<circle cx="8" cy="8" r="6" ' +
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
        lockers.push({ lat: result[0].latitude, lng: result[0].longitude });
      }
    });
  }
  return lockers;
}

export { calculateRouteFromAtoB, displayMarker, lockersCoorinates };
