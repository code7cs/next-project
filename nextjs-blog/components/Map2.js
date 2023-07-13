import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "25rem",
};

const center = {
  lat: 39.015047057742,
  lng: -74.87426567174822,
};

const position = {
  lat: 39.014888, // Set the latitude for the marker
  lng: -74.8743, // Set the longitude for the marker
};

const infoWindowText = `
<div>
  <h3 style="color: black;">💆‍♀️ Eastern Spa LLC</h3>
  <p style="color: black;">1304 NJ-47 unit w, Rio Grande, NJ 08242</p>
</div>
`;

const handleMarkerLoad = (marker) => {
  // Display an info window when the marker is clicked
  const infoWindow = new google.maps.InfoWindow({
    content: infoWindowText,
  });
  marker.addListener("click", () => {
    infoWindow.open(marker.getMap(), marker);
  });
};

function Map2() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  console.log("Map2 -> isLoaded: ", isLoaded);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoom: 15,
        maxZoom: 19,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={position} onLoad={handleMarkerLoad} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map2);
