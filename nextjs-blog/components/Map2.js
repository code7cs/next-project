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
  lng: -74.87435, // Set the longitude for the marker
};

const handleMarkerLoad = (marker) => {
  // Display an info window when the marker is clicked
  const infoWindow = new google.maps.InfoWindow();
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: marker.position }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
      const content = `
      <div>
       <h3 style="color: black;">💆‍♀️ Eastern Spa LLC</h3>
       <p style="color: black;">1304 NJ-47 unit w, Rio Grande, NJ 08242</p>
       <a style="color: blue" href="https://www.google.com/maps?q=${encodeURIComponent(
         "Eastern Spa Rio Grande"
       )}" target="_blank">Open in Google Maps</a>
      </div>`;
      infoWindow.setContent(content);
    } else {
      infoWindow.setContent("Location details not available");
    }
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
