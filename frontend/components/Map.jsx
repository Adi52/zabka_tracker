import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import { Table } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import CustomMarker from "./CustomMarker";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

const Map = ({ markers = [] }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const tableData = markers.map((marker, index) => ({
    key: marker.id,
    id: index + 1,
    title: marker.title,
    description: marker.description,
    position: { lat: marker.latitude, lng: marker.longitude },
  }));

  const [center, setCenter] = useState({ lat: 54.352, lng: 18.6466 });

  const onPickMarker = (data) => {
    setCenter(data.position);
    console.log(data);
    // todo: add open marker data.
  };

  return (
    <>
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
                  onPickMarker={onPickMarker}
                />
              ))}
            </>
          </GoogleMap>
        </LoadScript>
      </div>
      <div style={{ width: 500, marginLeft: 20 }}>
        <Table
          rowClassName="cursor-pointer"
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 15 }}
          onRow={(record) => ({
            onClick: () => onPickMarker(record),
          })}
        />
      </div>
    </>
  );
};

export default Map;
