import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import CustomMarker from "./CustomMarker";

const Map = ({ markers = [] }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const [center, setCenter] = useState({ lat: 54.352, lng: 18.6466 });
  return (
    <div style={{ flex: 1 }}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          clickableIcons={false}
        >
          <>
            {markers.map((marker) => (
              <CustomMarker
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                title={marker.title}
                id={marker.id}
                description={marker.description}
                setCenter={setCenter}
              />
            ))}
          </>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
