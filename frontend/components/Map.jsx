import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import { Button, Table, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import CustomMarker from "./CustomMarker";
import AddMarkerModal from "./AddMarkerModal";

const { Title } = Typography;

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

const Map = ({ markers = [], isEditMode, setIsEditMode, categoriesList }) => {
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

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newMarkerLocation, setNewMarkerLocation] = useState({});
  const [center, setCenter] = useState({ lat: 54.352, lng: 18.6466 });

  const onPickMarker = (data) => {
    setCenter(data.position);
    console.log(data);
    // todo: add open marker data.
  };

  return (
    <>
      <div
        style={{
          flex: 1,
          border: "3px solid #fff",
          borderColor: isEditMode ? "#1890FF" : "#fff",
          transition: "all 0.1s ease-in-out",
        }}
      >
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            clickableIcons={false}
            onClick={(e) => {
              if (isEditMode) {
                setNewMarkerLocation({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                });
                setIsOpenModal(true);
              }
            }}
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
              {isOpenModal && (
                <CustomMarker
                  position={{
                    lat: newMarkerLocation.lat,
                    lng: newMarkerLocation.lng,
                  }}
                  onPickMarker={onPickMarker}
                />
              )}
              {isEditMode && (
                <div className="map-label">
                  <Title level={4} style={{ marginBottom: 0 }}>
                    Click on map to add Marker
                  </Title>
                  <Button
                    style={{ marginLeft: 30 }}
                    type="primary"
                    icon={<CloseOutlined />}
                    onClick={() => setIsEditMode(false)}
                  />
                </div>
              )}
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
      <AddMarkerModal
        visible={isOpenModal}
        setVisible={setIsOpenModal}
        categoriesList={categoriesList}
        newMarkerLocation={newMarkerLocation}
      />
    </>
  );
};

export default Map;
