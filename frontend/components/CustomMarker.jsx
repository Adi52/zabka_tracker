import { InfoBox, Marker } from "@react-google-maps/api";
import React from "react";
import { Typography } from "antd";
import Link from "next/link";

const { Text, Link: AntLink, Title } = Typography;

const CustomMarker = (props) => {
  const {
    id,
    title,
    description,
    position,
    onPickMarker,
    user,
    setVisibleBox,
    visibleBox,
  } = props;
  const onMarkerClick = () => {
    onPickMarker({ position });
  };

  return (
    <>
      <Marker onClick={onMarkerClick} {...props} />
      {visibleBox?.open && visibleBox?.id === id && (
        <InfoBox
          position={position}
          onCloseClick={() => setVisibleBox({ id: null, open: false })}
        >
          <div className="tooltip-marker">
            <Title level={5}>{title}</Title>
            <Text>{description}</Text>
            <Link href={`/users/${user?.id}`}>
              <AntLink>{user?.username}</AntLink>
            </Link>
          </div>
        </InfoBox>
      )}
    </>
  );
};

export default CustomMarker;
